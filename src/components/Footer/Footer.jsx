import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/images/logo.png'

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-gray-500 text-white px-8 py-8">
                <aside>
                    <img className='w-auto h-7 bg-base-200' src={logo} alt='' />
                    <p>
                        <span className='text-lg font-bold'>
                            Task Management
                        </span>
                        <br />
                        Effortless Task Management Since 2017
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a href="https://www.facebook.com/khademulmowla.aupu.7/" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a href="https://github.com/khademulmowla" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/khademulmowla" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </div>

                </nav>
            </footer>
            <footer className="footer footer-center bg-gray-300 text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Task Management</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;