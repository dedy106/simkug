window.app_saku3_transaksi_apparindo_fPolis = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_apparindo_fPolis.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_apparindo_fPolis";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Polis : Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.pc2 = new pageControl(this,{bound:[10,10,1010,480], childPage:["Data Polis","List Polis"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Customer","Penerbit","Limit Ability"],
					colWidth:[[3,2,1,0],[120,240,240,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_periode = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[250,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.cb_cust = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Customer", multiSelection:false, maxLength:10, tag:2});	
		this.cb_asur = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Penerit/Asuransi", multiSelection:false, maxLength:10, tag:2});	
		this.l_tgl1 = new portalui_label(this.pc2.childPage[0],{bound:[20,14,100,18],caption:"Periode Polis", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,14,100,18],selectDate:[this,"doSelectDate"]});
		this.l_tgl1 = new portalui_label(this.pc2.childPage[0],{bound:[230,14,100,18],caption:"s/d", underline:false}); 
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[250,14,100,18],selectDate:[this,"doSelectDate"]}); 	
		this.e_nilai = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"Nilai Limit", tag:1, tipeText:ttNilai, text:"0"});								
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
			
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan = 1;	
			
			var strSQL = "select convert(varchar(10), GETDATE(),120) as tanggal, convert(varchar(6), GETDATE(),112) as periode ";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																
					this.e_periode.setText(line3.periode);	
				}
				this.doClick();
			}


			this.cb_cust.setSQL("select kode_cust, nama from cust2 where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);			
			this.cb_asur.setSQL("select kode_asur, nama from ape_asuransi where kode_lokasi='"+this.app._lokasi+"'",["kode_asur","nama"],false,["Kode","Nama"],"and","Data Asuransi",true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_apparindo_fPolis.extend(window.childForm);
window.app_saku3_transaksi_apparindo_fPolis.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from ape_polis where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					sql.add("update ape_polis set flag_seb = '"+this.e_nb.getText()+"' where flag_seb='-' and kode_cust='"+this.cb_cust.getText()+"' and kode_asur='"+this.cb_asur.getText()+"' ");

					sql.add("insert into ape_polis(no_bukti,kode_lokasi,kode_cust,kode_asur,limit,periode_awal,periode_akhir,flag_seb) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_cust.getText()+"','"+this.cb_asur.getText()+"','"+nilaiToFloat(this.e_nilai.getText())+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','-')");								
					

					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					setTipeButton(tbAllFalse);
					this.doClick();
				break;
			case "simpan" :																						
			case "ubah" :						
				 this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from ape_polis where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},	

	doClick:function(sender){		
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ape_polis","no_bukti",this.app._lokasi+"-POL"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.cb_cust.setFocus();
		setTipeButton(tbSimpan);			
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
					case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_tm_rptPiutangJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_piutang='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc2.hide();
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}else system.info(this,result,"");
	    			break;				
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){							
							this.dataDRK = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataDRK.set(line.kode_drk, line.nama);
								}
							}							
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			setTipeButton(tbAllFalse);			
		} catch(e) {
			alert(e);
		}
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_bukti,a.kode_cust+' | '+b.nama as cust,a.kode_asur+' | '+c.nama as penerbit,a.limit "+
		             "from ape_polis a inner join cust2 b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+
					 "                 inner join ape_asuransi c on a.kode_asur=c.kode_asur and a.kode_lokasi=c.kode_lokasi "+
					 "where a.flag_seb='-' and a.kode_lokasi='"+this.app._lokasi+"' ";						
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_bukti,line.cust,line.penerbit,floatToNilai(line.limit)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);				
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select * "+						 
							 "from ape_polis "+
							 "where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.dp_d1.setText(line.periode_awal);					
						this.dp_d2.setText(line.periode_akhir);					
						this.cb_cust.setText(line.kode_cust);
						this.cb_asur.setText(line.kode_asur);
						this.e_nilai.setText(floatToNilai(line.limit));						
					} 
				}
			}									
		} catch(e) {alert(e);}
	}
});