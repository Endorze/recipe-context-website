"use client"
import { useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import styles from "./Sidebar.module.css"
import Link from "next/link";
import { useLoginState } from "../../hooks/useLoginState";
import { useLogout } from "../../lib/auth";

const MAX_DRAG_FACTOR = 500
const MIN_DRAG_FACTOR = 120

export const Sidebar = () => {

    const containerRef = useRef<HTMLDivElement>(null)
    const blobRef = useRef<HTMLDivElement>(null)
    const {user, setUser} = useLoginState();
    const logout = useLogout();

    function logoutUser(e: React.FormEvent) {
        if (user) {
            setUser(null);
        }
    }


    useEffect(() => {
        const mouseMovement = (event: MouseEvent) => {
            if (blobRef.current) {
                blobRef.current.style.top = `${event.clientY}px`;
            }

            if (containerRef.current) {
                let xPosition = event.clientX;

                if (xPosition > MAX_DRAG_FACTOR) xPosition = MAX_DRAG_FACTOR;
                if (xPosition < MIN_DRAG_FACTOR) xPosition = MIN_DRAG_FACTOR;


                const dragFactor = 1 - ((xPosition - MIN_DRAG_FACTOR) / (MAX_DRAG_FACTOR - MIN_DRAG_FACTOR));

                console.log(dragFactor);
                containerRef.current.style.setProperty("--dragFactor", `${dragFactor}`)
            }
        };
        window.addEventListener("mousemove", mouseMovement);
        return () => window.removeEventListener("mousemove", mouseMovement);
    }, []);


    return (
        <aside ref={containerRef} className={`${styles.SidebarContainer} hidden md:block`}>
            <div className={styles.Sidebar}>
                <div className={styles.Content}>
                    <Link href={"/"} key={"home"}>Home</Link>
                    <Link href={"/profile"} key={"profile"}>My Profile</Link>
                    <Link href={"/recipes"} key={"recipes"}>All Recipes</Link>
                    <a target="_blank" href="/alexander_hallgren_cv.pdf">Resume/CV</a>
                    <button onClick={logout}>Logout</button>
                    <div className="flex gap-4">
                        <a href="https://www.linkedin.com/in/alexander-hallgren-5a4a501aa/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-gray-600 hover:opacity-80" size={30} />
                        </a>
                        <a href="https://github.com/Endorze" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-gray-800 hover:opacity-80" size={30} />
                        </a>
                        <a href="mailto:alexander.hallgren@edu.futuregames.se" target="_blank" rel="noopener noreferrer">
                            <FaEnvelope className="text-gray-800 hover:opacity-80" size={30} />
                        </a>
                    </div>
                </div>
                <div className={styles.SiderbarBorder}>
                    <div ref={blobRef} className={styles.HamburgerContainer}>
                        <img className={styles.Blob} src="/images/terracottablob.png" />
                        <img className="w-[38px] flex justify-center" src="/images/hammburgher.png" />
                    </div>
                </div>
            </div>
        </aside>
    )
}