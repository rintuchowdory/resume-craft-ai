import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Templates from './pages/Templates';
import JobMatcher from './pages/JobMatcher';
import About from './pages/About';
import Contact from './pages/Contact';
import Analytics from './pages/Analytics';
import TemplatePreview from './pages/TemplatePreview';
import Jobs from './pages/Jobs';
import News from './pages/News';
import Profile from './pages/Profile';
import JobDetails from './pages/JobDetails';
import PhotoEditor from './pages/PhotoEditor';
import PDFTools from './pages/PDFTools';
import StudentEventLanding from './pages/StudentEventLanding';
import EventDetails from './pages/EventDetails';
import Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Dashboard": Dashboard,
    "Editor": Editor,
    "Templates": Templates,
    "JobMatcher": JobMatcher,
    "About": About,
    "Contact": Contact,
    "Analytics": Analytics,
    "TemplatePreview": TemplatePreview,
    "Jobs": Jobs,
    "News": News,
    "Profile": Profile,
    "JobDetails": JobDetails,
    "PhotoEditor": PhotoEditor,
    "PDFTools": PDFTools,
    "StudentEventLanding": StudentEventLanding,
    "EventDetails": EventDetails,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: Layout,
};