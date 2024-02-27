export function RightArrow({ title='Move next', handleClick, handleSubmit=() => {return true} }) {
    return (
        <button type='submit'
                className='nav-btn right'
                title={title}
                onClick={() => {
                    if (handleSubmit()) handleClick();
                }}>
            <img src='src/assets/9554506_arrow_right_next_navigation_pointer_icon.svg'
                alt='Move next'>
            </img>
        </button>
    )
}