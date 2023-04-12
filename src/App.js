import TableReact from "./comp/TableReact";
import {useState, useEffect } from 'react';
import './style.css'
const App=  ()=>{
  const [menuData, setMenuData] = useState({});
  const [crData, setcrData] = useState('');
  

  const getData =async (cr)=>{
    setcrData(cr)
    try {
      let url=`https://api.coingecko.com/api/v3/simple/price?ids=Bitcoin%2CEthereum%2CTether%2CBNB%2CUSD%20Coin%2CXRP%2CCardano%2CDogecoin%2CPolygon%2CSolana%2CPolkadot%2CBinance%20USD%2CLitecoin%2CShiba%20Inu%2CTRON%2CAvalanche%2CDai&vs_currencies=${cr}`
      const res= await fetch(url)
      const data= await res.json()
      setMenuData(data)}
      catch (error) {
      }
    }
  
  
  useEffect(()=>{
    getData('usd');
  },[])
  return (
<>
    <div className="table-title">
    <h3>Data Table</h3>
    <label htmlFor="cars">Choose currency:</label>

<select name="cars" id="cars"  onChange={(e) => getData(e.target.value)} >
  <option value="usd">usd</option>
  <option value="pkr">pkr</option>


</select>  </div>
<br></br>
<br></br>
<br></br>
  <table className="table-fill">
    <thead>
      <tr>
        <th className="text-left">Name</th>
        <th className="text-left">Price</th>
      </tr>
    </thead>
    <tbody className="table-hover">
      {Object.keys(menuData).map((curElem) => {
        return (
          <tr key={curElem}>
            <td className="text-left">{curElem}</td>
            {crData==='usd'?(<td className="text-left">$ {menuData[curElem][crData]} </td>):(<td className="text-left">Rs {menuData[curElem][crData]}</td>)}
          </tr>
        );
      })}
    </tbody>
  </table>

<div className="table-title">
    <h3>Search Coin Details</h3>
    </div>
  <TableReact crData={crData}></TableReact>
  </>
);}

export default App;
