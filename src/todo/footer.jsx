import '../assets/style/footer.styl'


export default {
    data(){
        return {
            author:'Jokcy'
        }
    },
    render(){
        return (
            <div id="footer">
                <span>Writtne by {this.author}</span>
            </div>
        )
    }
}