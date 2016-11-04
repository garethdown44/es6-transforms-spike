import { orderBy, chain } from 'lodash';

export default src => (
  {
    bins: mapBins(src.Items.SearchBinSets.SearchBinSet.Bin),
    items: mapItems(src.Items.Item)
  }
)

const mapBins = bins => {
  const mapped = chain(bins)
	             .map(x => ({ key: x.BinParameter.Value, value: Number(x.BinItemCount) }))
	             .orderBy('value', 'desc')
	             .map(x => ({ [x.key]: x.value }));

  return Object.assign(...mapped);
}

const mapItems = items => (
  items.map(x => ({ rank: x.SalesRank,
                    title: x.ItemAttributes.Title,
                    manufacturer: x.ItemAttributes.Manufacturer,
                    similar: mapSimilar(x.SimilarProducts.SimilarProduct),
                    images: mapImages(x) }))
)

const mapSimilar = products => {
  const mapped = products.map(x => ({ [x.ASIN]: x.Title }));
  return Object.assign(...mapped);
}

const mapImages = item => (
  { small: mapImage(item.SmallImage),
    medium: mapImage(item.MediumImage) }
)

const mapImage = img => ({ url: img.URL,
                           height: img.Height['#'],
                           width: img.Width['#'] });