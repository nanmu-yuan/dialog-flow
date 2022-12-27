import './guestMessage.scss'
const GuestMessage = (props)=>{
   const {output} = props;
   let outputContent ='';
   if(output.outputMessage){
    outputContent = output.outputMessage
   }else{
    outputContent = `
        <div class="loading"></div>
    `
   }
        return(
            <div className='guest-message-warp'>
                <div className='guest-service'>
                    <div className='item-photo'>
                        <div className='item-avatar'></div>
                    </div>
                    <div className='content'>
                        <div className='ctn-answer'>
                            <div className='j-image'>
                                <div dangerouslySetInnerHTML={{__html:outputContent}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    
}
export default GuestMessage