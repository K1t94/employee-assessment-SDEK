import React from 'react'

export const Loader = (): JSX.Element => (
    <div className="loaderWrapper">
        <div className="text-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </div>
);
