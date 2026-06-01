import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FlightIcon from "@mui/icons-material/Flight";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PetsIcon from "@mui/icons-material/Pets";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CoffeeIcon from "@mui/icons-material/Coffee";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MovieIcon from "@mui/icons-material/Movie";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BuildIcon from "@mui/icons-material/Build";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// Iconos de ingresos
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WorkIcon from "@mui/icons-material/Work";
import LaptopIcon from "@mui/icons-material/Laptop";
import SavingsIcon from "@mui/icons-material/Savings";

export const CATEGORY_ICONS = {
  // Expenses
  shopping: ShoppingCartIcon,
  food: RestaurantIcon,
  housing: HomeIcon,
  transport: DirectionsCarIcon,
  health: LocalHospitalIcon,
  education: SchoolIcon,
  gaming: SportsEsportsIcon,
  travel: FlightIcon,
  fitness: FitnessCenterIcon,
  pets: PetsIcon,
  fashion: ShoppingBagIcon,
  coffee: CoffeeIcon,
  fuel: LocalGasStationIcon,
  mobile: PhoneAndroidIcon,
  music: MusicNoteIcon,
  movies: MovieIcon,
  drinks: LocalBarIcon,
  gifts: CardGiftcardIcon,
  tools: BuildIcon,

  // Income
  bank: AccountBalanceIcon,
  investments: TrendingUpIcon,
  salary: WorkIcon,
  freelance: LaptopIcon,
  savings: SavingsIcon,

  // Fallback
  other: MoreHorizIcon,
} as const;

export type IconName = keyof typeof CATEGORY_ICONS;

export const getICon = (name: string) => {
  return CATEGORY_ICONS[name as IconName] ?? CATEGORY_ICONS.other;
};

export const ICON_NAMES = Object.keys(CATEGORY_ICONS) as IconName[];
