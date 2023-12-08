
import avatar from '../assets/images/Mohan-muruge.jpg'

export default function MainPage(){
    
    <div>
        <div className="main">
            <div className="video">
                <div className="video-player"></div>
                <div className="video-description">
                    <div className="video-description-title"></div>
                    <div className="video-description-section">
                        <div className="video-description-section_left">
                            <div className="video-description-section_left-title"></div>
                            <div className="video-description-section_left-date"></div>
                        </div>
                        <div className="video-description-section_right">

                        </div>
                        
                    </div>
                </div>
                <div className="video-comments">
                    <div className="video-comments-form">
                        <img src={avatar}></img>
                    </div>
                </div>
            </div>
        </div>
    </div>
}