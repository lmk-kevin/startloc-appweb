import React, { useState } from "react";
import { useApp } from "../providers/app.provider";
import logo from "../images/logoPNG.png";
import "../styles/LoginScreen.css";
import { useNavigate } from "react-router-dom";
import { apiGetCollabBySocId, apiGetEmail } from "../api/api";
import CustomAlert from "../components/CustomAlert";

function LoginScreen() {
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [itsOkForMail, setItsOkForMail] = useState(false);
    const [errTxt, setErrTxt] = useState("");
    const { colors } = useApp();

    async function NavTo() {
        if (mail && mail.trim()) {
            const user = await apiGetEmail(mail);
            const nbCollab = await apiGetCollabBySocId(
                user.soc_id,
                user.soc_token
            );
            if (
                user.soc_email &&
                user.soc_active_collab == 0 &&
                nbCollab.length > 0 &&
                user.soc_hash &&
                user.soc_salt &&
                user.soc_token
            ) {
                //Cas d'une ancienne société qui n'a pas sélectionnée ses collaborateurs
            } else if (user.collabo_email || user.soc_email) {
                if (
                    user.collabo_email &&
                    (user.collabo_hash == "" ||
                        user.collabo_salt == "" ||
                        user.collabo_token == "")
                ) {
                    // Collabo qui n'a pas entré son nouveau mot de passe
                    setItsOkForMail(true);
                } else if (
                    user.soc_email &&
                    (user.soc_hash == "" ||
                        user.soc_salt == "" ||
                        user.soc_token == "")
                ) {
                    // Société qui n'a pas entré son nouveau mot de passe
                    setItsOkForMail(true);
                } else {
                    setItsOkForMail(true);
                    //Passage au mot de passe
                }
                setErrTxt("");
            } else {
                setErrTxt("Aucun compte n'est lié à cette adresse mail");
                return;
            }
        } else {
            setErrTxt("Veuillez entrer une adresse mail");
            return;
        }
    }

    const EmailOrPassword = () => {
        if (itsOkForMail) {
            return <PartPasswordComponent />;
        } else {
            return <PartEmailComponent />;
        }
    };
    const PartPasswordComponent = () => {
        const handleChangPass = (event) => {
            setPassword(event.target.value);
            setErrTxt("");
        };
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    jusifyContent: "center",
                    width: "100%",
                }}
            >
                <input
                    style={{
                        border:
                            errTxt.length > 0
                                ? "1px solid #D42F36"
                                : "1px solid #bcbcbc",
                    }}
                    className="input"
                    type="text"
                    placeholder="Mot de passe"
                    // autoFocus
                    value={password}
                    onChange={handleChangPass}
                />
                <p className="txt-err">{errTxt}</p>
                <button
                    className="btn btn-svt"
                    style={{ backgroundColor: colors }}
                    onClick={async () => {
                        await NavTo();
                    }}
                >
                    <p>Se connecter</p>
                </button>
                <button
                    onClick={() => {
                        setItsOkForMail(false);
                    }}
                    className="btn-rtr"
                >
                    <p>Retour</p>
                </button>
            </div>
        );
    };

    const PartEmailComponent = () => {
        const handleChangeMail = (event) => {
            setMail(event.target.value);
            setErrTxt("");
        };
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    jusifyContent: "center",
                    width: "100%",
                }}
            >
                <input
                    style={{
                        border:
                            errTxt.length > 0
                                ? "1px solid #D42F36"
                                : "1px solid #bcbcbc",
                    }}
                    className="input"
                    type="text"
                    placeholder="Email"
                    value={mail}
                    autoFocus
                    onChange={handleChangeMail}
                />
                <p className="txt-err">{errTxt}</p>
                <button
                    className="btn btn-svt"
                    style={{ backgroundColor: colors }}
                    onClick={async () => {
                        await NavTo();
                    }}
                >
                    <p>Suivant</p>
                </button>
                <button onClick={NavTo} className="btn btn-crt-cmpt">
                    <p>Créer un compte</p>
                </button>
            </div>
        );
    };
    return (
        <div className="container">
            <img src={logo} className="logo" alt="logo" />
            <h1>Bienvenue</h1>
            {EmailOrPassword()}
            <CustomAlert state={openAlert} />
        </div>
    );
}

export default LoginScreen;
