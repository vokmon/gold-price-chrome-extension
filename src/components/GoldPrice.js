import React from 'react'
import PropTypes from 'prop-types';
import './GoldPrice.css';

function GoldPrice({
  price,
  bottomText,
}) {

  const hsh = price?.find((p) => p.GoldType.toUpperCase() === 'HSH');
  const ref = price?.find((p) => p.GoldType.toUpperCase() === 'REF');
  const jewel = price?.find((p) => p.GoldType.toUpperCase() === 'JEWEL');

  return (
    <div className='gold-price'>
      <table cellSpacing={0}>
        <thead>
          <tr>
            <th>ประเภททอง</th>
            <th>รับซื้อ</th>
            <th>ขายออก</th>
            <th>เปลี่ยนแปลง</th>
          </tr>
        </thead>
        <tbody>
          {hsh && (
            <tr>
              <td className='title'>
                <div>ทองคำแท่ง 96.5%</div>
                <div>ฮั่วเซ่งเฮง</div>
              </td>
              <td className='buy'>{hsh.Buy}</td>
              <td className='sell'>{hsh.Sell}</td>
              <td className={hsh.BuyChange === 0 ? '' : Number(hsh.BuyChange) > 0 ? 'change-up' : 'change-down'}>{hsh.BuyChange}</td>
            </tr>
          )}

          {ref && (
            <tr>
              <td className='title'>
                <div>ทองคำแท่ง 96.5%</div>
                <div>สมาคมค้าทอง</div>
              </td>
              <td className='buy'>{ref.Buy}</td>
              <td className='sell'>{ref.Sell}</td>
              <td className={ref.BuyChange === 0 ? '' : Number(ref.BuyChange) > 0 ? 'change-up' : 'change-down'}>{ref.BuyChange}</td>
            </tr>
          )}

          {jewel && (
            <tr>
              <td className='title'>
                <div className='jewel'>ทองรูปพรรณ</div>
              </td>
              <td className='buy'>{jewel.Buy}</td>
              <td className='sell'>{jewel.Sell}</td>
              <td className={jewel.BuyChange === 0 ? '' : Number(jewel.BuyChange) > 0 ? 'change-up' : 'change-down'}>{jewel.BuyChange}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='footer'>
        <div>
          {hsh && hsh.StrTimeUpdate}
        </div>
        <div>
          {bottomText}
        </div>
      </div>
    </div>
  )
}

GoldPrice.defaultProps = {
  price: [],
  bottomText: '',
}

GoldPrice.propTypes = {
  price: PropTypes.array,
  bottomText: PropTypes.string,
};

export default GoldPrice
