import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.scss';

class Searchbar extends Component {
  static propTypes = {
    whenSubmit: PropTypes.func,
  };

  static defaultProps = {
    whenSubmit: () => {},
  };

  state = {
    userInput: '',
  };

  handleChange = event => {
    this.setState({ userInput: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.whenSubmit(this.state);
    this.formReset();
  };

  formReset = () => {
    this.setState({ userInput: '' });
  };

  render() {
    return (
      <>
        <section className={styles.Searchbar}>
          <form className={styles.Searchbar__Form} onSubmit={this.handleSubmit}>
            <button className={styles.Searchbar__Button} type="submit">
              <span className={styles.Searchbar__ButtonLabel}>Search</span>
            </button>

            <input
              className={styles.Searchbar__Input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.userInput}
              onChange={this.handleChange}
            />
          </form>
        </section>
      </>
    );
  }
}

export default Searchbar;
