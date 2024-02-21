export function LeftArrow({ title='Move back', handleClick }) {
    return (
        <button className='nav-btn left'
                title={title}
                onClick={handleClick}>
            <img src='src/assets/9554501_arrow_left_navigation_gps_direction_icon.svg'
                alt='Move back'>
            </img>
        </button>
    )
}