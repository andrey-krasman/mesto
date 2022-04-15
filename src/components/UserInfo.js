export class UserInfo {
    constructor({userProfileSelector, careerProfileSelector, profileAvatar}) {
        this._profileName = document.querySelector(userProfileSelector)
        this._profileCareer = document.querySelector(careerProfileSelector)
        this._profileAvatar = document.querySelector(profileAvatar)
    }

    getUserInfo () {
        return {   
            name: this._profileName.textContent,
            career: this._profileCareer.textContent,
        }
    }

    setUserInfo (name, career) {
        this._profileName.textContent = name
        this._profileCareer.textContent = career
    }

    setUserAvatar (avatar) { 
        this._profileAvatar.src = avatar 
    }
}