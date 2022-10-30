import { Router } from 'express';
import { limiter } from '../libs';
import path from 'path';
import fs from 'fs';

const router = Router();

/**
 * API info.
 * @method get
 */
router.route('/').get(limiter, (req, res) => {
  const packageName = 'package.json';
  const packagePath = path.join(__dirname, '../../../' + packageName);
  const rawPackageData = fs.readFileSync(packagePath).toString();
  const jsonPackageData = JSON.parse(rawPackageData);
  // show app info from package.json
  res.json({
    name: `${jsonPackageData.name}`,
    version: `${jsonPackageData.version}`,
    description: `${jsonPackageData.description}`,
    author: `${jsonPackageData.author}`,
    year: `${jsonPackageData.year}`,
  });
});

export default router;
