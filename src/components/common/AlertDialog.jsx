import React from 'react'
import { sleep_logo } from '../../assets'

const AlertDialog = ({handleChange, title, description}) => {

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pt-5 p-6 pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center ml-4">
            <div className='h-fit'>
              <img src={sleep_logo} alt="" />
            </div>
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
          <button 
          onClick={handleChange}
          type="button" className="inline-flex w-full justify-center rounded-md hover:bg-primary-purple px-3 py-2 text-sm font-semibold text-white shadow-sm bg-secondary-darkpurple sm:ml-3 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default AlertDialog