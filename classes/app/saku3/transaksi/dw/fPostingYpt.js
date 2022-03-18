window.app_saku3_transaksi_dw_fPostingYpt = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_dw_fPostingYpt.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_dw_fPostingYpt";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Posting Transaksi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:0});
		this.cb_fs = new saiCBBL(this,{bound:[20,10,222,20],caption:"Kode FS", multiSelection:false, maxLength:10, tag:0});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Posting",maxLength:30,readOnly:true, tag:2});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.sg1 = new saiGrid(this,{bound:[20,5,500,200],colCount:2,tag:9,
		            colTitle:["Kode","Nama Lokasi"],
					colWidth:[[1,0],[300,100]],
					readOnly:true,
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this,{bound:[20,220,500,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		
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
			
			this.periode=this.dbLib.getPeriodeFromSQL("select max(periode) as periode from periode ");
			this.cb_fs.setSQL("select kode_fs, nama from fs where kode_lokasi='"+this.app._lokasi+"'",["kode_fs","nama"],false,["Kode FS","Nama"],"and","Data FS",true);			
			this.cb_fs.setText("FS1");
			this.e_periode.setText(this.periode);
			this.doClick(this.i_gen);
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_dw_fPostingYpt.extend(window.childForm);
window.app_saku3_transaksi_dw_fPostingYpt.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					this.doClick(this.i_gen);
					sql.add("insert into exs_posting_m(no_post,kode_lokasi,periode,tanggal,modul,keterangan,nik_buat,nik_app,no_del,tgl_input,nik_user,nilai) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'-','Generate Data Periode "+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','-',getdate(),'"+this.app._userLog+"',0)");
					
					//sql.add("exec sp_exs_proses_ypt '"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.cb_fs.getText()+"'");
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("exec sp_exs_proses_ypt '"+this.sg1.cells(0,i)+"','"+this.e_periode.getText()+"','"+this.cb_fs.getText()+"'");	
							}
						}
					}		
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
					this.standarLib.clearByTag(this, new Array("2"),this.e_nb);
					this.doClick(this.i_gen);
					
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"exs_posting_m","no_post",this.app._lokasi+"-EXS"+this.e_periode.getText().substr(2,4)+".","000"));
			
			setTipeButton(tbSimpan);
		}
		
	},
	
	doChange:function(sender){
		
		
		
	},
	
	doLoad:function(sender){						
		var strSQL = "select a.kode_lokasi,a.nama from lokasi a where flag_aktif='1' and kode_lokkonsol<>'-' order by a.kode_lokasi ";		
	
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
			
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];											
			this.sg1.appendData([line.kode_lokasi,line.nama]); 
		}
		this.sg1.setNoUrut(start);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._periode = closePeriode(this.app._periode,this.maxPeriode);
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");							
							this.app._mainForm.bClear.click();
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
	}
	
});
