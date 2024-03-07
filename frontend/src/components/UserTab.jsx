import React from "react";

const UserTab = ({ user }) => {
  return (
    <>
      <div className='tab-pane fade show active' id='home' role='tabpanel'>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='card card-small mb-4 pt-3'>
              <div className='card-header border-bottom text-center'>
                <div className='mb-3 mx-auto'>
                  <img
                    className='rounded-circle'
                    src={user.image}
                    alt='User Avatar'
                    width='110'
                  />
                </div>
                {user && <h4 className='mb-0'>{user.name}</h4>}
                <button
                  type='button'
                  className='mb-2 btn btn-sm btn-pill btn-outline-primary mr-2'
                >
                  <i className='material-icons mr-1'></i> Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTab;
