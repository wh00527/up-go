/**
 * The page Js file
 */
var PageJs = new Class.create();
PageJs.prototype = Object.extend(new BackEndPageJs(), {
	_pagination: {'pageNo': 1, 'pageSize': 30} //the pagination details
	,_searchCriteria: {} //the searching criteria
	
	,getResults: function(reset, pageSize, completeFunc) {
		var tmp = {};
		tmp.me = this;
		tmp.reset = (reset === true ? true : false);
		tmp.resultDiv = $(tmp.me._htmlIDs.resultDivId);
		
		if(tmp.reset === true)
			tmp.me._pagination.pageNo = 1;
		tmp.me._pagination.pageSize = (pageSize || tmp.me._pagination.pageSize);
		tmp.me.postAjax(tmp.me.getCallbackId('getItems'), {'pagination': tmp.me._pagination, 'searchCriteria': tmp.me._searchCriteria}, {
			'onLoading': function () {
				//reset div
				if(tmp.reset === true) {
					tmp.resultDiv.update( tmp.me._getLoadingDiv() );
				}
			}
			,'onSuccess': function(sender, param) {
				try{
					tmp.result = tmp.me.getResp(param, false, true);
					if(!tmp.result)
						return;
					//reset div
					if(tmp.reset === true) {
						if(tmp.result.pageStats.totalRows === 0) {
							tmp.resultDiv.update(tmp.me._getNoResultDiv());
							return;
						}
						$(tmp.me._htmlIDs.totalNoOfItemsId).update(tmp.result.pageStats.totalRows);
						tmp.resultDiv.update('');
					}
					//remove next page button
					tmp.resultDiv.getElementsBySelector('.paginWrapper').each(function(item){
						item.remove();
					});
					
					//show all items
					tmp.result.items.each(function(item) {
						$(tmp.resultDiv).insert({'bottom': tmp.me._getResultRow(item).addClassName('item_row').writeAttribute('item_id', item.id) });
					});
					//show the next page button
					if(tmp.result.pageStats.pageNumber < tmp.result.pageStats.totalPages)
						tmp.resultDiv.insert({'bottom': tmp.me._getNextPageBtn().addClassName('paginWrapper') });
				} catch (e) {
					tmp.resultDiv.insert({'bottom': tmp.me.getAlertBox('Error', e).addClassName('alert-danger') });
				}
			}
			,'onComplete': function() {
				if(typeof(completeFunc) === 'function')
					completeFunc();
			}
		});
	}
	
	,_getNextPageBtn: function() {
		var tmp = {}
		tmp.me = this;
		return new Element('div')
			.insert({'bottom': new Element('span', {'class': 'btn btn-primary btn-lg col-xs-12', 'data-loading-text':"Fetching more results ..."}).update('Show More')
				.observe('click', function() {
					tmp.btn = $(this);
					tmp.me._signRandID(tmp.btn);
					jQuery('#' + tmp.btn.id).button('loading');
					tmp.me._pagination.pageNo = tmp.me._pagination.pageNo*1 + 1;
					tmp.me.getResults(false, tmp.me._pagination.pageSize, function() {
						jQuery('#' + tmp.btn.id).button('reset');
					});
				})
			});
	}
	
	,_getTitleRowData: function() {
		return {};
	}
	
	,_getResultRow: function(property) {
		console.debug(property);
		return new Element('div', {'class': 'row'}).store(property)
			.insert({'bottom': new Element('div', {'class': 'col-sm-8 col-sm-push-4'})
				.insert({'bottom': new Element('div', {'class': 'row'})
					.insert({'bottom': new Element('div', {'class': 'col-sm-8'})
						.insert({'bottom': new Element('a', {'href': '/backend/property/' + property.sKey + '.html'})
							.insert({'bottom': new Element('h4').update(property.address.full) })
						})
					})
					.insert({'bottom': new Element('div', {'class': 'col-sm-4 text-right'})
						.insert({'bottom': new Element('a', {'href': 'javascript: void(0);', 'class': 'col-xs-4', 'title': property.noOfRooms + ' Bedrooms'})
							.insert({'bottom': new Element('span', {'class': 'fa fa-users'}) })
							.insert({'bottom': new Element('span').update(' ' + property.noOfRooms) })
						})
						.insert({'bottom': new Element('a', {'href': 'javascript: void(0);', 'class': 'col-xs-4', 'title': property.noOfBaths + ' Bathrooms'})
							.insert({'bottom': new Element('span', {'class': 'fa fa-cogs'}) })
							.insert({'bottom': new Element('span').update(' ' + property.noOfBaths) })
						})
						.insert({'bottom': new Element('a', {'href': 'javascript: void(0);', 'class': 'col-xs-4', 'title': property.noOfCars + ' Car Spaces'})
							.insert({'bottom': new Element('span', {'class': 'fa fa-car'}) })
							.insert({'bottom': new Element('span').update(' ' + property.noOfCars) })
						})
					})
				})
				.insert({'bottom': new Element('div', {'class': 'row hidden-xs'})
					.insert({'bottom': new Element('div', {'class': 'col-sm-12'}) 
						.insert({'bottom': new Element('small') 
							.insert({'bottom': new Element('em').update(property.description)  })
						})
					})
				})
			})
			.insert({'bottom': new Element('div', {'class': 'col-sm-4 col-sm-pull-8  hidden-xs'})
				.insert({'bottom': new Element('a', {'class': 'thumbnail', 'href': 'comgooglemaps://maps.googleapis.com/maps/api/staticmap?center=' + property.address.full})
					.insert({'bottom': new Element('img', {'src': '//maps.googleapis.com/maps/api/staticmap?center=' + property.address.full + '&zoom=15&size=300x200&markers=color:red|label:P|' + property.address.full + '', 'class': 'img-responsive', 'alt': property.address.full})})
				})
			})
		;
	}
	
	,_getNoResultDiv: function() {
		return new Element('div', {'class': 'no-result-div'})
			.insert({'bottom': new Element('h4', {'class': ''})})
			.insert({'bottom': new Element('p', {'class': 'lead'}).update('There isn\'t any property for you yet, please ')
				.insert({'bottom': new Element('a', {'href': $('new-property-btn').readAttribute('href'), 'class': 'btn btn-success btn-xs'}).update(new Element('span', {'class': 'glyphicon glyphicon-plus'}))
					.insert({'bottom': ' ADD'})
				})
				.insert({'bottom': ' one now.'})
			})
			.insert({'bottom': new Element('hr', {'style': 'width: 100px;'}) })
			.insert({'bottom': new Element('p').update('Only one minute to add a property ')
				.insert({'bottom': new Element('span', {'class': 'fa fa-cog fa-spin'}) })
			})
	}
});