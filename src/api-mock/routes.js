// import category from "./modules/category";
import anggota from "./modules/anggota";
import cicilan from "./modules/cicilan";
import pinjaman from "./modules/pinjaman";
import simpanan from "./modules/simpanan";
import kas from "./modules/kas";

const routes = [...anggota, ...simpanan, ...pinjaman, ...cicilan, ...kas];

export default routes;
