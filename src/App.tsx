import './App.css';
import TableForShips from './component/Table';

function App() {
    return (
        <div className="app">
            <div className="content">
                <div className="textWrapper">WORLD OF WARSHIPS</div>
                <div className="tableWrapping">
                    <TableForShips />
                </div>
            </div>
        </div>
    );
}

export default App;
