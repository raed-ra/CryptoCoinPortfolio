import React from 'react'
import { Button,Spinner } from 'react-bootstrap'


    function LoaderButton({isLoading, disabled}) {

        return(
            <div>
                <Button variant="success" disabled={disabled}>
                    {isLoading && <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    >
                    Loading...</Spinner>}
                    ADD TO PORTFOLIO
                </Button>
            </div>
        )
 
    
}

export default LoaderButton;