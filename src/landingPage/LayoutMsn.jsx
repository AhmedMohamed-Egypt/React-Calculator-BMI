import EveyThing from "./EveyThing"
import Footer from "./Footer"
import Header from "./Header"
import OurWolrd from "./OurWolrd"
import Page from "./Page"
import RightTime from "./RightTime"
import Supportive from "./Supportive"
import Trainee from "./Trainee"
import UnLock from "./UnLock"
import Welcome from "./Welcome"

function LayoutMsn() {
    return (
    <>
        <div className="container mx-auto">
        <Header/>
       
      </div>
       <Welcome/>
       <Page>
        <UnLock/>
        <OurWolrd/>
        <Supportive/>
        <Trainee/>
        <RightTime/>
        <EveyThing/>
        <Footer/>
       </Page>
    </>
    )
}

export default LayoutMsn
