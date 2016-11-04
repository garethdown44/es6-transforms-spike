import { orderBy } from 'lodash';

export default function transform(src) {
  return {
  	bins: mapBins(src.Items.SearchBinSets.SearchBinSet.Bin),
  	items: mapItems(src.Items.Item)
  }
}

function mapBins(bins) {
  const mapped = orderBy(bins, x => Number(x.BinItemCount), 'desc')
  				 .map(x => ({ [x.BinParameter.Value]: Number(x.BinItemCount) }));
  return Object.assign(...mapped);
}

function mapItems(items) {
  const mapped = items.map(x => ({ rank: x.SalesRank,
  								   title: x.ItemAttributes.Title,
  								   manufacturer: x.ItemAttributes.Manufacturer,
  								   similar: mapSimilar(x.SimilarProducts.SimilarProduct),
  								   images: mapImages(x) }));
  return mapped;
}

function mapSimilar(products) {
  const mapped = products.map(x => ({ [x.ASIN]: x.Title }));
  return Object.assign(...mapped);
}

function mapImages(item) {
  const mapped = { small: mapImage(item.SmallImage), medium: mapImage(item.MediumImage) };

  return mapped;
}

const mapImage = img => ({ url: img.URL,
  						   height: img.Height['#'],
  						   width: img.Width['#'] });