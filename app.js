// const BASE_URL=`https://open.er-api.com/v6/latest/`
const fromCurr =document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const dropdowns=document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

document.addEventListener("load" , () => {
    updateExchangeRate();

})

// the below is adding the list of countries to the dropdown

for(let select of dropdowns)
{
    for (currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value = currCode;
        // the below is making the by default option as usd and inr for from and to 
        if(select.name === "from" && currCode ==="USD")
        {
            newOption.selected="selected";
        }
        if(select.name === "to" && currCode ==="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
    });

}

// the below is updating the flag according to the country code
const updateFlag =(element)=>{
    // console.log(element);
    let currCode=element.value;
    // console.log(currCode);
    let countryCode=countryList[currCode];
    // console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    // console.log(img);
    img.src=newSrc;
};





btn.addEventListener("click" , async (evt) =>
{
    // the below will lead to stop all auto form work and only will do what is mentioned in code
    evt.preventDefault();
    updateExchangeRate();



    // let amount = document.querySelector(".amount input");
    // let amtVal = amount.value;
    // if(amtVal === " " || amtVal < 1){
    //     amtVal =1;
    //     amount.value="1";
    // }

    // // console.log(fromCurr.value , toCurr.value);

    // const URL =`https://open.er-api.com/v6/latest/${fromCurr.value}`
    // let response = await fetch(URL);
    // let data=await response.json();
    // // console.log(response);
    // console.log(data);
    // console.log(data.rates[toCurr.value]);
    // let rate = data.rates[toCurr.value];
    // let finalAmount = amtVal*rate;
    // msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
})

const updateExchangeRate = async () =>
{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === " " || amtVal < 1){
        amtVal =1;
        amount.value="1";
    }

    // console.log(fromCurr.value , toCurr.value);

    const URL =`https://open.er-api.com/v6/latest/${fromCurr.value}`
    let response = await fetch(URL);
    let data=await response.json();
    // console.log(response);
    console.log(data);
    console.log(data.rates[toCurr.value]);
    let rate = data.rates[toCurr.value];
    let finalAmount = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}