import { Link } from 'react-router-dom'
import '../../Styles/Footer.css'

function Footer() {
  return (
    <footer>
      <ul>
        <li>Groupomania &copy; 2023</li>
        <Link className="footer-link" to="#">
          <li>About Us</li>
        </Link>
        <Link className="footer-link" to="#">
          <li>Privacy & Legal</li>
        </Link>
        <Link className="footer-link" to="#">
          <li>Terms</li>
        </Link>
        <Link className="footer-link" to="#">
          <li>Contact</li>
        </Link>
      </ul>
    </footer>
  )
}

export default Footer
