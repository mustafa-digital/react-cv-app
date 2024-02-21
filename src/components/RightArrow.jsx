export function RightArrow({ title='Move next', handleClick, form }) {
    return (
        <button type='submit'
                htmlFor={form}
                className='nav-btn right'
                title={title}
                onClick={handleClick}>
            <img src='src/assets/9554506_arrow_right_next_navigation_pointer_icon.svg'
                alt='Move next'>
            </img>
        </button>
    )
}