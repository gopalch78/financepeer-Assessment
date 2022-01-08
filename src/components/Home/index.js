import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import PostItem from '../PostItem'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    postData: [],
    upload: null,
    uploadResponse: '',
  }

  componentDidMount() {
    this.getPostData()
  }

  uploadSelectedFile = async () => {
    const {upload} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://gopal-financepeer-app.herokuapp.com/posts'
    const options = {
      method: 'POST',
      headers: {
        authorization: `bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: upload,
    }
    const uploadFileResponse = await fetch(url, options)
    console.log(uploadFileResponse)
    const uploadFileResponseData = await uploadFileResponse.json()
    this.setState({
      uploadResponse: uploadFileResponseData.msg,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const reader = new FileReader()

    reader.onload = this.logFile

    reader.readAsText(event.target.files[0])
  }

  logFile = event => {
    const str = event.target.result

    console.log(str)

    this.setState({upload: str})
  }

  changeOnUpload = e => {
    this.handleSubmit(e)
  }

  getPostData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_Token')
    const apiUrl = `https://gopal-financepeer-app.herokuapp.com/getPosts`
    const options = {
      method: 'GET',
      headers: {
        authorization: `bearer ${jwtToken}`,
        Accept: 'application/json',
      },
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const updatedData = fetchedData.map(each => ({
      user_id: each.userId,
      id: each.id,
      title: each.title,
      body: each.body,
    }))
    this.setState({
      postData: updatedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoadingView = () => (
    <div>
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <h1 className="error-message">No Posts Found</h1>
    </div>
  )

  renderPostListView = () => {
    const {postData} = this.state
    return (
      <ul className="ul-container">
        {postData.map(each => (
          <PostItem key={each.id} postDetails={each} />
        ))}
      </ul>
    )
  }

  renderPosts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPostListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {uploadResponse} = this.state
    const uploadedSuccessfully =
      uploadResponse === 'data of the file is uploaded into database...'
    const isCookie = Cookies.get('jwt_token')
    if (isCookie === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <div className="home-container">
          <Header />
          <h2 className="select-file-heading">Upload File</h2>
          <input
            type="file"
            name="sampleFile"
            accept="application/json"
            className="file-input-style"
            onChange={this.changeOnUpload}
          />
          <button
            type="button"
            className="button-style"
            onClick={this.uploadSelectedFile}
          >
            upload
          </button>
          {uploadedSuccessfully ? (
            <button
              className="button-style"
              type="button"
              onClick={this.getPostData}
            >
              click here to display uploaded data
            </button>
          ) : null}

          <div className="posts-container">{this.renderPosts()}</div>
        </div>
      </>
    )
  }
}
export default Home
