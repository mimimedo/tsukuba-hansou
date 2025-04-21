import React, { useState, useEffect } from 'react';

const App = () => {
  const [timeSlot, setTimeSlot] = useState('日中8:30〜17:00');
  const [distance, setDistance] = useState('10Km');
  const [workTime, setWorkTime] = useState('30分');
  const [options, setOptions] = useState({
    ドライアイス:false, シーツB:false, シーツD:false, 枕飾りセット:false, 仏具セット:false, 経机:false, 守刀:false,
    線香:false, ロウソク:false, 合掌バンド:false, 華香２箱:false, 納体袋:false, 大掛け:false, 棺６尺:false
  });
  const [price, setPrice] = useState({ base: 0, tax: 0, total: 0 });

  const priceTableDaytime = {
    '10Km': 15300, '20Km': 17400, '30Km': 20400, '40Km': 23400, '50Km': 26500, '70Km': 31400, '90Km': 37200, '110Km': 42100,
    '130Km': 48900, '150Km': 53800, '180Km': 61700, '210Km': 69600, '240Km': 77500, '270Km': 85400, '300Km': 93300,
    '330Km': 101200, '360Km': 109100, '390Km': 117000, '420Km': 124900, '450Km': 132800, '480Km': 140700,
    '510Km': 148600, '540Km': 156500, '570Km': 164400, '600Km': 172300, '630Km': 180200, '660Km': 188100,
    '690Km': 196000, '720Km': 203900, '750Km': 211800, '780Km': 219700, '810Km': 227600, '840Km': 235500,
    '870Km': 243400, '900Km': 251300, '930Km': 259200, '960Km': 267100, '990Km': 275000
  };

  const priceTableNightEarlyMorning = {
    '10Km':16050,'20Km':18150,'30Km':21150,'40Km':24150,'50Km':27250,'70Km':32150,'90Km':37950,'110Km':42850,
    '130Km':49650,'150Km':54550,'180Km':62450,'210Km':70350,'240Km':78250,'270Km':86150,'300Km':94050,
    '330Km':101950,'360Km':109850,'390Km':117750,'420Km':125650,'450Km':133550,'480Km':141450,
    '510Km':149350,'540Km':157250,'570Km':165150,'600Km':173050,'630Km':180950,'660Km':188850,
    '690Km':196750,'720Km':204650,'750Km':212550,'780Km':220450,'810Km':228350,'840Km':236250,
    '870Km':244150,'900Km':252050,'930Km':259950,'960Km':267850,'990Km':275750
  };

  const priceTableLateNight = {
    '10Km':18440,'20Km':20540,'30Km':23540,'40Km':26540,'50Km':29640,'70Km':35540,'90Km':40340,'110Km':45240,
    '130Km':52040,'150Km':56940,'180Km':64840,'210Km':72740,'240Km':80640,'270Km':88540,'300Km':96440,
    '330Km':104340,'360Km':112240,'390Km':120140,'420Km':128040,'450Km':135940,'480Km':143840,
    '510Km':151740,'540Km':159640,'570Km':167540,'600Km':175440,'630Km':183340,'660Km':191240,
    '690Km':199140,'720Km':207040,'750Km':214940,'780Km':222840,'810Km':230740,'840Km':238640,
    '870Km':246540,'900Km':254440,'930Km':262340,'960Km':270240,'990Km':278140
  };

  const additionalFees = {
    ドライアイス:10000, シーツB:2000, シーツD:8000, 枕飾りセット:10000, 仏具セット:6000,
    経机:4000, 守刀:1000, 線香:400, ロウソク:400, 合掌バンド:400, 華香２箱:5000,
    納体袋:5000, 大掛け:3500, 棺６尺:25000
  };

  useEffect(() => {
    calculatePrice();
  }, [timeSlot, distance, workTime, options]);

  const calculatePrice = () => {
    let basePrice = 0;
    const minutes = parseInt(workTime.replace('分', '')) || 0;

    if (timeSlot === '日中8:30〜17:00') {
      basePrice = priceTableDaytime[distance] || 0;
    } else if (timeSlot === '夜間17:00〜22:00 / 早朝5:00〜8:30') {
      basePrice = priceTableNightEarlyMorning[distance] || 0;
      if (minutes > 30) basePrice += Math.ceil((minutes - 30) / 30) * 750;
    } else if (timeSlot === '深夜22:00〜5:00') {
      basePrice = priceTableLateNight[distance] || 0;
      if (minutes > 30) basePrice += Math.ceil((minutes - 30) / 30) * 1060;
    }

    Object.entries(options).forEach(([key, value]) => {
      if (value) basePrice += additionalFees[key];
    });

    const tax = Math.round(basePrice * 0.1);
    setPrice({ base: basePrice.toLocaleString(), tax: tax.toLocaleString(), total: (basePrice + tax).toLocaleString() });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto font-sans">
  <div className="bg-white shadow-lg rounded-xl p-6">
    <h2 className="text-2xl font-bold mb-6 border-b pb-2">筑波大搬送料金</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* 作業時間帯 */}
      <div>
        <label className="block font-semibold mb-1">作業時間帯</label>
        <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full border rounded p-2">
          <option>日中8:30〜17:00</option>
          <option>夜間17:00〜22:00 / 早朝5:00〜8:30</option>
          <option>深夜22:00〜5:00</option>
        </select>
      </div>

      {/* 実車距離 */}
      <div>
        <label className="block font-semibold mb-1">実車距離</label>
        <select value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full border rounded p-2">
          {Object.keys(priceTableDaytime).map((km) => <option key={km}>{km}</option>)}
        </select>
      </div>

      {/* 作業時間 */}
      <div>
        <label className="block font-semibold mb-1">作業時間</label>
        <select value={workTime} onChange={(e) => setWorkTime(e.target.value)} className="w-full border rounded p-2">
          {[...Array(24)].map((_, i) => `${30 + i * 30}分`).map((time) => <option key={time}>{time}</option>)}
        </select>
      </div>
    </div>

    {/* オプション */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
      {Object.keys(options).map((key) => (
        <label key={key} className="flex items-center space-x-2">
          <input type="checkbox" checked={options[key]} onChange={(e) => setOptions({ ...options, [key]: e.target.checked })} />
          <span>{key}（{additionalFees[key].toLocaleString()}円）</span>
        </label>
      ))}
    </div>

    {/* 結果 */}
    <div className="bg-gray-100 rounded p-4 space-y-2 text-lg font-bold">
      <div>税抜料金: {price.base}円</div>
      <div>消費税: {price.tax}円</div>
      <div className="text-2xl text-blue-600">合計料金: {price.total}円</div>
    </div>
  </div>
</div>

  );
};

export default App;
