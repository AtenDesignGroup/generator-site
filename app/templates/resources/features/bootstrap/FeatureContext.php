<?php

use Behat\Behat\Context\ClosuredContextInterface,
    Behat\Behat\Context\TranslatedContextInterface,
    Behat\Behat\Context\BehatContext,
    Behat\Behat\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode,
    Behat\Gherkin\Node\TableNode;

use Behat\MinkExtension\Context\MinkContext;

//
// Require 3rd-party libraries here:
//
//
use Phpunit\Framework\Assert\Functions;

/**
 * Features context.
 */
class FeatureContext extends MinkContext {
  /**
   * Initializes context.
   *
   * Every scenario gets it's own context object.
   *
   * @param array $parameters
   *   Context parameters (set them up through behat.yml).
   */
  public function __construct(array $parameters) {
    // Initialize your context here
  }
}
