import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Category } from "../../models/Category";
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from "react-router-dom";
import "../../styles/scss/styles.scss";
import { useStore } from "../../stores/StoreManager";



function FooterComponent() {
    const footerPreflight = useRef(true);
    useEffect(() => {
        if (footerPreflight.current) {
            footerPreflight.current = false;
            categoriesStore.getCategories();
        }
    }, []);
    const { categoriesStore } = useStore();

    return (

        <footer>


            <div className="footer-info">
                <div className="footer-info-left">
                    <h6 className="footerTitle">O nama</h6>
                    <p className="footerAbout">OŠ Sesvetska Sela započela je s radom 03. rujna 2007. godine. Nalazi se u Letničkoj ulici u Sesvetskim Selima, koja su dio Gradske četvrti Sesvete. Ponosni smo na naziv škole i na okoliš koji stvara jedan lijep ugođaj: spaja seoski mir i ljepotu prirode s gradskom organizacijom i uređenjem života.</p>

                </div>
                <div className="footer-info-center">
                    <h6 className="footerTitle">Kategorije</h6>
                   <ul>
                        {(() => {
                            return categoriesStore.categories.map((x, index) => (
                                <>
                                    <li>
                                        <Link
                                            to={"/Category"}
                                            onClick={() => {
                                                categoriesStore.setSelectedCategory(x);
                                            }}
                                            key={"category" + index}
                                        >
                                            {x.name}
                                        </Link>
                                    </li>
                                </>
                            ));
                        })()}
                 </ul>
                </div>
                <div className="footer-info-right">
                    <h6 className="footerTitle">Brzi linkovi</h6> 
                    <ul>                  
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Contribute</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Sitemap</a></li>
                        </ul>
                </div>
            </div>


            <hr />

            <p className="footer-info">Copyright &copy; 2022 Sva prava pridržana od strane &nbsp;
                <a href="#"> TVZ</a>.
            </p>

        </footer>




    )






}

export default observer(FooterComponent);














