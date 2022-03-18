window.app_saku3_transaksi_ykap_fGlma = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ykap_fGlma.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ykap_fGlma";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Edit Saldo Awal", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		
		this.pc2 = new pageControl(this,{bound:[10,10,800,430], childPage:["Entry Data"]});			
		this.e_lokasi = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Kode Lokasi",maxLength:50,readOnly:true,tag:2});
        this.c_periode = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Periode",readOnly:true,tag:2,change:"doChange"});
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,13,790,350], childPage:["Item"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Saldo"],
					colWidth:[[3,2,1,0],[120,50,250,80]],					
					columnReadOnly:[true,[1],[0,2,3]],
					buttonStyle:[[0,2],[bsEllips,bsAuto]], 
					colFormat:[[3],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
			
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
            this.stsSimpan = 1;
            this.e_lokasi.setText(this.app._lokasi);
            this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from glma where kode_lokasi='"+this.app._lokasi+"' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}
            this.c_periode.setText(data.rs.rows[0].periode);
            var sql = new server_util_arrayList();
            var query = "select a.kode_akun,a.nama from masakun a inner join glma b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and b.periode='"+this.c_periode.getText()+"' ";
			sql.add(query);		
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ykap_fGlma.extend(window.childForm);
window.app_saku3_transaksi_ykap_fGlma.implement({				
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
                                sql.add("delete from glma where kode_akun='"+this.sg.cells(0,i)+"' and kode_lokasi='"+this.app._lokasi+"' and periode='"+this.c_periode.getText()+"' ");
                                if(this.sg.cells(2,i) == "D"){
                                    var saldo = parseNilai(this.sg.cells(3,i));
                                }else{
                                    var saldo = parseNilai(this.sg.cells(3,i)) * -1;
                                }
								sql.add("insert into glma (kode_akun,kode_lokasi,periode,so_akhir,tgl_input,nik_user) values "+
										"('"+this.sg.cells(0,i)+"','"+this.e_lokasi.getText()+"','"+this.c_periode.getText()+"',"+saldo+",getdate(),'"+this.app._userLog+"')");
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
					this.standarLib.clearByTag(this, new Array("0","1"),"");
					this.sg.clear(1); 					
					this.sg3.clear(1);					
					this.pc2.setActivePage(this.pc2.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :															
			case "ubah" :																			
				this.preView = "1";
				this.sg.validasi();							
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}					
				}

				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				break;				
		}
	},
	doChangeCell: function(sender, col, row){
		    
		if (col == 0) {
			if (sender.cells(0,row) != "") {		
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) {
                    sender.cells(1,row,akun);
                    var sql = "select a.kode_akun,a.nama,abs(b.so_akhir) as so_akhir,case when b.so_akhir < 0 then 'C' else 'D' end as dc from masakun a inner join glma b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and b.periode='"+this.c_periode.getText()+"' and b.kode_akun='"+sender.cells(0,row)+"' ";
					var data = this.dbLib.getDataProvider(sql,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							sender.cells(2,row,line.dc.toUpperCase());				
							sender.cells(3,row,line.so_akhir);
						}
                    }
                    setTipeButton(tbUbah);
				}
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}
		
		sender.onChange.set(this,"doChangeCell");		
	},	
	doCellEnter: function(sender, col, row){
		// switch(col){			
		// 	case 3 : 
		// 			if (this.sg.cells(3,row) == ""){
		// 				if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
		// 				else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
		// 			}
		// 		break;
		// 	case 4 : 
		// 			if (this.sg.cells(4,row) == "" && row > 0) {
		// 				var sls = nilaiToFloat(this.e_debet.getText()) - nilaiToFloat(this.e_kredit.getText());
		// 				sls = Math.abs(sls); 
		// 				this.sg.setCell(4,row,floatToNilai(sls));
		// 			}
		// 		break;
		// 	case 5 : 
		// 			if (this.sg.cells(5,row) == "") {
		// 				if (row == 0) {
		// 					this.sg.setCell(5,row,this.app._kodePP);
		// 					this.sg.setCell(6,row,this.app._namaPP);
		// 				}
		// 				else {
		// 					this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
		// 					this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
		// 				}
		// 			}
		// 		break;							
		// }
	},	
	doChange: function(sender){
		try{
			if (sender == this.c_periode && this.c_periode.getText() != ""){		
				var sql = new server_util_arrayList();
				var query = "select a.kode_akun,a.nama from masakun a inner join glma b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and b.periode='"+this.c_periode.getText()+"' ";
				sql.add(query);		
				this.dbLib.getMultiDataProviderA(sql);
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join glma b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and b.periode='"+this.c_periode.getText()+"'",
							"select count(a.kode_akun) from masakun a inner join glma b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '"+this.app._lokasi+"' and b.periode='"+this.c_periode.getText()+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}			
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							
							system.info(this,"Transaksi telah sukses tereksekusi","");							
							this.clearLayar();
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
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
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),"");
			this.sg.clear(1); 			
			this.pc2.setActivePage(this.pc2.childPage[0]);	
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	}
});