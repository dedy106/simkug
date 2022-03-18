window.app_saku3_transaksi_tarbak_simak_fBayarLoadH = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fBayarLoadH.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fBayarLoadH";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Hapus Pelunasan Tagihan", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new saiCB(this,{bound:[20,11,200,20],caption:"Periode", readOnly:true,tag:2, change:[this,"doChange"]});
		this.cb_bukti = new saiCBBL(this,{bound:[20,18,220,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:2 });
		this.bTampil = new button(this,{bound:[820,18,80,20],caption:"Load Data",click:[this,"doLoad"]});			

		this.pc1 = new pageControl(this,{bound:[20,12,900,410], childPage:["Data Pelunasan"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:0,
		            colTitle:["No Bill","NIS","Nilai"],					
					colWidth:[[2,1,0],[100,150,150]],					
					colFormat:[[2],[cfNilai]],
					readOnly:true,					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});	
		
		this.rearrangeChild(10, 23);		
		setTipeButton(tbHapus);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.e_periode.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from sis_rekon_d where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' union select distinct periode from sis_cd_d where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																		
					this.e_periode.addItem(i,line.periode);
				}
			} 
			this.e_periode.setText("");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simak_fBayarLoadH.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fBayarLoadH.implement({			
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_bukti);
					this.sg.clear(1); 
					this.cb_pp.setText(this.app._kodePP);
					setTipeButton(tbHapus);

					var strSQL = "select distinct a.no_rekon, b.keterangan "+
						 "from sis_rekon_d a inner join kas_m b on a.no_rekon=b.no_kas and a.kode_lokasi=b.kode_lokasi and b.modul='LOADSISKB' and b.posted='F' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and b.kode_pp='"+this.app._kodePP+"' "+

						 "union "+

						 "select distinct a.no_bukti, b.keterangan "+
						 "from sis_cd_d a inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi and b.modul='LOADSISKB' and b.posted='F' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and b.kode_pp='"+this.app._kodePP+"' "+

						 "union "+
						 
						 "select distinct a.no_rekon, b.keterangan "+
						 "from sis_rekon_d a inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi and b.modul in ('LOADCD','LOADBEA') and b.posted='F' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and b.kode_pp='"+this.app._kodePP+"' ";
					this.cb_bukti.setSQL(strSQL,["no_rekon","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Pelunasan",true);			
					
				break;					
			case "hapus" :	
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from kas_m where no_kas='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from kas_j where no_kas='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				
				sql.add("delete from sis_rekon_m where no_rekon='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from sis_rekon_j where no_rekon='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	

				sql.add("delete from sis_rekon_d where no_rekon='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
				sql.add("delete from sis_cd_d where no_bukti='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	

				sql.add("delete from sis_bill_m where no_bill='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from sis_bill_d where no_bill='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				
				break;			
		}
	},		
	doChange: function() {
		if (this.e_periode.getText() != "") {
			var strSQL = "select distinct a.no_rekon, b.keterangan "+
						 "from sis_rekon_d a inner join kas_m b on a.no_rekon=b.no_kas and a.kode_lokasi=b.kode_lokasi and b.modul='LOADSISKB' and b.posted='F' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and b.kode_pp='"+this.app._kodePP+"' "+

						 "union "+

						 "select distinct a.no_bukti, b.keterangan "+
						 "from sis_cd_d a inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi and b.modul='LOADSISKB' and b.posted='F' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and b.kode_pp='"+this.app._kodePP+"' "+

						 "union "+
						 
						 "select distinct a.no_rekon, b.keterangan "+
						 "from sis_rekon_d a inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi and b.modul in ('LOADCD','LOADBEA') and b.posted='F' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and b.kode_pp='"+this.app._kodePP+"' "+

						 "";
			this.cb_bukti.setSQL(strSQL,["no_rekon","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Pelunasan",true);			
		}
	},
	doLoad: function(sender){							
		var strSQL = "select no_bill,nis,nilai from sis_rekon_d where no_rekon='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;				
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.no_bill,line.nis,floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							//this.nama_report="server_report_saku3_siswa_rptSisJurnalRekonYpt";
							//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.cb_bukti.getText()+"' ";
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
							this.pc1.hide();							
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.cb_bukti);
			this.sg.clear(1); 
			setTipeButton(tbHapus);

			var strSQL = "select distinct a.no_rekon, b.keterangan "+
						 "from sis_rekon_d a inner join kas_m b on a.no_rekon=b.no_kas and a.kode_lokasi=b.kode_lokasi and b.modul='LOADSISKB' and b.posted='F' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and b.kode_pp='"+this.app._kodePP+"' "+

						 "union "+

						 "select distinct a.no_bukti, b.keterangan "+
						 "from sis_cd_d a inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi and b.modul='LOADSISKB' and b.posted='F' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and b.kode_pp='"+this.app._kodePP+"' "+

						 "union "+
						 
						 "select distinct a.no_rekon, b.keterangan "+
						 "from sis_rekon_d a inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi and b.modul in ('LOADCD','LOADBEA') and b.posted='F' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode='"+this.e_periode.getText()+"' and b.kode_pp='"+this.app._kodePP+"' ";
			this.cb_bukti.setSQL(strSQL,["no_rekon","keterangan"],false,["No Bukti","Deskripsi"],"and","Data Pelunasan",true);			

		} catch(e) {
			alert(e);
		}
	}
});