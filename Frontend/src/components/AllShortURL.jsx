/* eslint-disable react/prop-types */
import { API } from "../helpers/API"

const AllShortURL = ({shortUrlData}) => {

    function formatTime(dateTime) {
        const date = new Date(dateTime);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleString('en-US', options).replace(',', '');
    }
    

  return (
    <div className="relative overflow-x-auto shadow-md">

        <table className="w-full text-sm text-left text-white rtl:text-right dark:text-white">
            
            <thead className="text-xs text-white uppercase bg-slate-500">
                <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                        Short URL
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Count
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Full URL
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Created at
                    </th>
                </tr>
            </thead>
            {
                shortUrlData?.length < 1 ? (
                    <tbody>
                        <tr className="border-b odd:bg-gray-700 even:bg-gray-500 dark:border-gray-700">
                            <td colSpan="4" className="text-center">
                                No Data Found
                            </td>
                        </tr>
                    </tbody>
                ) :
                (
                    shortUrlData.map((val) => {
                        return (
                            <tbody key={val._id}>
                                <tr className="border-b odd:bg-gray-700 even:bg-gray-500 dark:border-gray-700">
                                    <td className="px-6 py-4 text-center">
                                        <a href={`${API}/s/${val.shortURL}`} target="_blank" rel="noreferrer">
                                            {`${API}/s/${val.shortURL}`}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {val.count}
                                    </td>
                                    <td className="max-w-xs px-6 py-4 overflow-x-hidden text-center scrollbar-hide hover:overflow-x-auto focus:overflow-x-auto">
                                        {val.fullURL}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {formatTime(val.time)}
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                )
            }

        </table>
    </div>
  )
}

export default AllShortURL