import React from 'react'

function SubmitHostel({loading}) {
  return (
    <button
    type="submit"
    className="px-4 py-2 bg-hov hover:bg-hovDark text-text rounded flex items-center mx-auto"
    disabled={loading} // Disable button during submission
  >
    {loading ? (
      <span className="spinner-border spinner-border-sm mr-2 text-gray-600 bg-gray-600"></span>
    ) : null}
    Submit
  </button>
  )
}

export default SubmitHostel