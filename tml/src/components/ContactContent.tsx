import Style from "./ContactContent.module.css";

export default function ContactContent() {
    return (
        <div className="flex flex-col gap-[1rem]">
            <h1 className={Style.title}>Contact</h1>
            <p>
                If you want to get in touch, you can reach me at:
            </p>
            <ul className="list-disc pl-5">
                <li>Email: <a href="mailto: mihaitelea02@gmail.com"> mihaitelea02@gmail.com</a></li>
                <li>LinkedIn: <a href="https://www.linkedin.com/in/mihaitelea02" target="_blank" rel="noopener noreferrer">Telea Mihai</a></li>
                <li>GitHub: <a href="https://github.com/Telea-Mihai" target="_blank" rel="noopener noreferrer">Telea-Mihai</a></li>
                <li>Instagram: <a href="https://www.instagram.com/telmihai_/" target="_blank" rel="noopener noreferrer">telmihai_</a></li>
            </ul>
            <p>Feel free to reach out for collaborations or just a friendly chat!</p>
        </div>
    );
}