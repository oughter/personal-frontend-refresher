import * as CONSTANTS from '../common/constants';

/**
 * Accession data model.
 * 
 * Abstracts away raw Elasticsearch formatted results returned
 * by the GeneLab API.
 */

export default class Accession {
  /**
   * Create an Accession instance.
   *
   * @param  {Object} data - The raw data
   * @return {Accession}   - The Accession instance
   */
  constructor(data) {
    this.data = data._source;
  }

  /**
   * Factory for creating an Accession instance.
   *
   * @param  {Object} data - The raw data
   * @return {Accession}   - The Accession instance
   */
  static create(data) {
    return new Accession(data);
  }

  /**
   * Get the organism.
   *
   * @return {String}
   */
  get organism() {
    return this.data.organism || '';
  }

  /**
   * Get the accession id.
   *
   * @return {String}
   */
  get id() {
    return this.data.Accession || '';
  }

  /**
   * Get the study URL.
   *
   * @return {String}
   */
  get url() {
    if (this.data['Authoritative Source URL']) {
      return `${CONSTANTS.GENE_LAB_ROOT_URL}/genelab/accession/${this.data['Authoritative Source URL']}`;
    }

    let url = this.data['Project Link'];
    return url || '';
  }

  /**
   * Get the study title.
   *
   * @return {String}
   */
  get title() {
    return this.data['Project Title'] || this.data['Study Title'] || '';
  }

  /**
   * Get the study publication date in YYYY-MM-DD format.
   *
   * @return {String}
   */
  get date() {
    if (this.data["Study Public Release Date"] === undefined) {
      return '';
    }

    const releaseDate = new Date(parseInt(this.data["Study Public Release Date"], 10) * 1000);
    return `${releaseDate.getFullYear()}-${releaseDate.getMonth() + 1}-${releaseDate.getDate()}`;
  }

  /**
   * Get the study thumbnail URL.
   *
   * @return {String}
   */
  get thumbnailUrl() {
    return this.data.thumbnail ?  `${CONSTANTS.GENE_LAB_ROOT_URL}${this.data.thumbnail}` : '';
  }
}
