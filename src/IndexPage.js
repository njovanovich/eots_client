import React from 'react';

class IndexPage extends React.Component{
    render(){
        return (
            <div>
                <h1>Eve Online Trading System</h1>
                <p>
                    This is a new type of trading system for EVE which allows you to upload market logs for credits, and
                    charges you a small micro-payment for a trade.  All trade offers are unique meaning what you pay for
                    is only available to you.  This is managed by orderID key-pairs, meaning different combinations are OK.
                </p>
                <p>
                    To upload marketlogs, simply zip them and upload the .zip file on the upload page.  You will need to
                    register and login to use the upload facility.  Your account will be credited per valid market log.
                    We are not accepting 0.0 logs at this time, high-sec only please.
                </p>
                <p>
                    Trades are listed in the trade panel.  Simply select the trades you want and they will be revealed
                    to you.  You will need to put your credit card details in if your purchase exceeds your credit.
                    Credit card details are not stored in this system, we are PCI compliant.
                </p>
            </div>
        );
    }
}

export {IndexPage};