// import category from "./modules/category";
import anggota from "./modules/anggota";
import cicilan from "./modules/cicilan";
import pinjaman from "./modules/pinjaman";
import simpanan from "./modules/simpanan";

const routes = [...anggota, ...simpanan, ...pinjaman, ...cicilan];

export default routes;
