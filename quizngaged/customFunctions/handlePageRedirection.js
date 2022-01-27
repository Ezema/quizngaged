export default function handlePageRedirection(redirectToPage){
    console.log("redirectToPage",redirectToPage)
    window.location.pathname(redirectToPage)
    console.log("window.location",window.location)
}