const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));


app.use(express.json());