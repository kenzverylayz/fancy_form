import React, { useState } from "react";
import { Input, Modal } from "antd";
import {
  DownOutlined,
  SwapOutlined
} from "@ant-design/icons";
import tokenList from "../prices.json";


function Swap() {
  const [firstAmount, setFirstAmount] = useState(null);
  const [secondAmount, setSecondAmount] = useState(null);
  const [first, setFirst] = useState(tokenList[0]);
  const [second, setSecond] = useState(tokenList[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  
  function getPrice(selectedToken) {
    const token = tokenList.find((item) => item.currency === selectedToken.currency);
    return token ? token.price : 0; 
  }
  
  function changeAmount(e) {
    const inputValue = e.target.value;
    const isValidInput = /^\d+$/.test(inputValue);
    if (isValidInput || inputValue === '') {
      setFirstAmount(inputValue);
    }
  }
  

  function handleSwap() {
    if (firstAmount) {
      const price = getPrice(first) / getPrice(second);
      const calculatedAmount = (price * firstAmount).toFixed(2);
      setSecondAmount(calculatedAmount);
    } else {
      setSecondAmount(null);
    }
  }
  
  function switchTokens() {
    setFirstAmount(null);
    setSecondAmount(null);
    const one = first;
    const two = second;
    setFirst(two);
    setSecond(one);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i){
    setFirstAmount(null);
    setSecondAmount(null);
    if (changeToken === 1) {
      setFirst(tokenList[i]);
    } else {
      setSecond(tokenList[i]);
    }
    setIsOpen(false);
  }
  return (
    <>
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Token Select"
      >
        <div className="modalContent">
          {tokenList?.map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyToken(i)}
              >
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.currency}</div>
                  <div className="tokenTicker">≈  ${e.price} USD</div>
                  <img src={e.img} alt={e.ticker} className="tokenLogo" />
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
      <div className="overallBox">
        <div className="overallBoxHeader">
          <h4>Swap</h4>
        </div>
        <div className="inputs">
          <Input
            placeholder='0'
            value={firstAmount}
            onChange={changeAmount}
          />
          <Input 
            placeholder='0'
            value={secondAmount} 
            disabled={true} />
          <div className="switchButton" onClick={switchTokens}>
            <SwapOutlined className="switchArrow" />
          </div>
          <div className="first" onClick={() => openModal(1)}>
            <img src={first.img} alt="firstLogo" className="coinLogo" />
            {first.currency}
            <DownOutlined />
          </div>
          <div className="second" onClick={() => openModal(2)}>
            <img src={second.img} alt="secondLogo" className="coinLogo" />
            {second.currency}̣̣̣
            <DownOutlined />
          </div>
        </div>
        <div className="swapButton"  onClick={handleSwap} >Swap</div>
      </div>
    </>
  );
}

export default Swap;
