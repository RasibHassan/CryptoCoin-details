import React, { useState , useEffect} from 'react'
import './style.css'
const TableReact = ({crData}) => {
    const [Svalue,setSvalue] = useState('')
    const [myList,setmyList] = useState({})
    const [isFound,setisFound] = useState(false)
    const [hasRendered, setHasRendered] = useState(false);


    const getDetails=async()=>{
      try{let url=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${crData}&ids=${Svalue}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
      const res= await fetch(url)
      const data= await res.json()
      setHasRendered(true)

      if (data.length===0){
          setisFound(false)
          alert("ENTER CORRECT NAME OF COIN")
      }
      else{
        setisFound(true)
        const name=data[0].name
        const price=data[0].current_price
        const cap=data[0].market_cap
        const rank=data[0].market_cap_rank

        const myinfo={
          name,price,cap,rank
        }
        setmyList(myinfo)
      
      }
    }

      catch(error){
        console.log(error)
      }
    
    }
    useEffect(() => {
      if (hasRendered) {
        getDetails();
      } 
    }, [crData]);


  return (
    <>
    <br></br>

    <div className="wrap">
   <div className="search">
      <input type="text" className="searchTerm" placeholder="What are you looking for?" value={Svalue} onChange={(e)=>setSvalue(e.target.value)} onKeyDown={(e) => {
    if (e.key === 'Enter') {
      getDetails()}}}></input>
      <button type="submit" className="searchButton" onClick={getDetails}>
        search
     </button>
   </div>

</div>

<br></br>
{isFound===true?(
  <table className="table-fill">
<thead>
<tr>
<th className="text-left">Name</th>
<th className="text-left">Current Price</th>
<th className="text-left">Market capitalization</th>
<th className="text-left">market Rank</th>
</tr>
</thead>
<tbody className="table-hover">
<tr>
<td className="text-left">{myList['name']}</td>
{crData==='usd'?(
    <React.Fragment>

<td className="text-left">$ {myList['price']}</td>
<td className="text-left">$ {myList['cap']}</td>
</React.Fragment>

):
(  <React.Fragment>

  <td className="text-left">Rs {myList['price']}</td>
<td className="text-left">Rs {myList['cap']}</td>
</React.Fragment>
)
}


<td className="text-left">{myList['rank']}</td>
</tr>
</tbody>
</table>
):(
<br></br>
)}






    </>
    )
}

export default TableReact
