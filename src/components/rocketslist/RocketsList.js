import React from 'react';
import Pagination from '../pagination/Pagination';
import Loader from '../loader/Loader';
import './rocketslist.css'
import response from '../../data.json'
import Popup from '../popup/Popup';
import SearchForm from '../searchform/SearchForm';

class RocketsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      listItems: [],
      page: 1,
      totalPages: 0,
      recordsPerPage: 10,
      enterpageno: '',
      isOpen: false,
      selectedRocketId: '5e9d0d95eda69955f709d1eb'
    }
  }

  togglePopup = (id) => {
    this.setState({isOpen: !this.state.isOpen, selectedRocketId: id})
  }
  componentDidMount() {
    this.loadListItem();
  }

  loadListItem () {
    this.setState({ showLoader: true });
    //here basically we need to call one api and we need to pass page = 1,2,3... and size means record per page query params
    //and from API we get the data we will update it 
    setTimeout(() => {
      const totalPages = Math.ceil(response.totalRockets / this.state.recordsPerPage) // Calculate total records
      const rocketsList = response?.data.slice(0,10)
      this.setState({ showLoader: false, listItems: rocketsList, totalPages: totalPages })    
    },4000)
  }

  onChangeRecordsPerPage (event) {
    this.setState ({ recordsPerPage: parseInt(event.target.value) }, () => {
      this.loadListItem()
    })
  }

  gotoPage () {
    if (!isNaN(parseInt(this.state.enterpageno))) {
      this.setState({ page: parseInt(this.state.enterpageno) })
      this.loadListItem()
    }
  }

  onPageChanged (page) {
    this.setState ({ page: page }, () => {
      this.loadListItem()
    })
  }
  
  inputPageChange = (e) => {
    if (!isNaN(parseInt(e.target.value))) {
      this.setState({ enterpageno: parseInt(e.target.value) })
    }
  }
  updateData(rockets, totalRockets) {
    this.setState({showLoader: true})
    console.log(rockets)
    setTimeout(() => {
      const totalPages_ = Math.ceil(totalRockets / this.state.recordsPerPage) // Calculate total records
      this.setState({showLoader: false, listItems: rockets, totalPages: totalPages_})
    },4000)
  }

  render() {
    return (
      <>
      <SearchForm updateData={this.updateData.bind(this)}/>
      <div className="rocketWrapper">
        <Loader loading={this.state?.showLoader} />
        {
          !this.state?.showLoader && this.state?.listItems?.length ? <h1 className="text-center font-monospace mb-4">Rockets List</h1> : ''
        }
        <div className="rockets-container">
        {
          this.state?.listItems?.map(({id, name, flickr_images, description}) => {
            return (
              <div className="card rocket-items" key={id} onClick={(e) => this.togglePopup(id)}>
                <img src={flickr_images[0]} className="card-img-top" alt={name} />
                <div className="card-body">
                    <h2>{name}</h2>
                    <p className="card-text my-2">{`${description.substring(0,100)}...`}</p>
                    <button className="btneffect learn-more">Learn More</button>
                </div>
            </div>
            )
          })
        }
        {
          this.state?.listItems?.length === 0 && this.state?.showLoader === false ? 
          <div className="no-record">No Records Found</div>: ''
        }
        </div>
        {
          this.state?.listItems?.length > 0 ?
          <Pagination totalPages={this.state?.totalPages} currentPage={this.state?.page} maxVisibleButtons={ 3 } onPageChanged={ (e) => this.onPageChanged(e) }/> : ''
        }
        <div>
      {this.state.isOpen && <Popup
        selectedRocketId={this.state.selectedRocketId}
        handleClose={this.togglePopup}
      />}
  </div>
      </div>
    </>
    );
  }
}

export default RocketsList;