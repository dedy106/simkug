window.app_saku3_transaksi_kredit_fBrgOut = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kredit_fBrgOut.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kredit_fBrgOut";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Barang Keluar", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:2,visible:false});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Penjualan","Data Transaksi"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:3,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi"],
					colWidth:[[2,1,0],[500,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,13,300,20],caption:"No Dokumen", maxLength:100});				
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,500,20],caption:"Keterangan", maxLength:150});						
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Area Bisnis",multiSelection:false,tag:2,change:[this,"doChange"]});
				
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,20,990,305], childPage:["Data Item Barang"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:0,
		            colTitle:["Kode","Nama","Merk Tipe","Satuan","Stok","Jumlah"],					
					colWidth:[[5,4,3,2,1,0],[80,80,80,200,250,80]],									    
				    columnReadOnly:[true,[1,2,3,4],[0,5]],					
					buttonStyle:[[0],[bsEllips]], 
					colFormat:[[4,5],[cfNilai,cfNilai]],
					ellipsClick:[this,"doEllipseClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],									
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
				
		this.rearrangeChild(10, 22);
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
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
			
			this.cb_pp.setText(this.app._kodePP);
			
			var sql = new server_util_arrayList();
			sql.add("select kode_brg, nama from kre_brg where kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kredit_fBrgOut.extend(window.portalui_childForm);
window.app_saku3_transaksi_kredit_fBrgOut.implement({
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
					if (this.stsSimpan == 1) this.doClick();										
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					if (this.stsSimpan == 0) {
						sql.add("delete from kre_jual_m where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kre_jual_j where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kre_jual_d where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					
					sql.add("insert into kre_jual_m(no_jual,kode_lokasi,tanggal,no_dokumen,kode_pic,keterangan,kode_pp,periode,nik_user,tgl_input,nilai,nilai_ppn,nilai_diskon,kode_cust,no_kas,posted,modul,akun_piutang) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','-','"+this.e_ket.getText()+"','"+this.cb_pp.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),0,0,0,'-','-','X','OUT','-')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){		
								sql.add("insert into kre_jual_d(no_jual,kode_lokasi,periode,nu,kode_brg,kode_pp,satuan,jumlah,bonus,harga,hpp,diskon) values "+  
									   "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.cb_pp.getText()+"','"+this.sg.cells(3,i)+"',"+nilaiToFloat(this.sg.cells(5,i))+",0,0,0,0)");
							}
						}						
					}		
					this.stsPPN = 1;
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg.clear(1);										
				}
				break;
			case "simpan" :	
			case "ubah" :			
				this.preView = "1";
				this.nik_user=this.app._userLog;						
				var sql = "call sp_kre_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
				this.dbLib.execQuerySync(sql);	
			    
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						var data = this.dbLib.getDataProvider("select stok from kre_stok where kode_brg='"+this.sg.cells(0,i)+"'  and kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and nik_user='"+this.nik_user+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0]; 
							if (this.stsSimpan == 1) var stokPlus = 0; 
							else var stokPlus = nilaiToFloat(this.sg.cells(5,i));	
							if (line != undefined) this.sg.cells(4,i,parseFloat(line.stok) + stokPlus);
						}					
						if (nilaiToFloat(this.sg.cells(4,i)) < nilaiToFloat(this.sg.cells(5,i))) {
							var k = i+1;
							system.alert(this,"Transaksi tidak valid.","Jumlah melebihi Stok [Baris "+k+"]");
							return false;						
						}
						for (var j=i;j < this.sg.getRowCount();j++){
							if (this.sg.cells(0,j) == this.sg.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data barang untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}			
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kre_jual_m where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kre_jual_j where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kre_jual_d where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;									
		}
	},
	doClick:function(sender){
		try {
			if (this.e_periode.getText()!= "") {
				if (this.stsSimpan == 0) {
					this.sg.clear(1);
					this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Gudang",true);			
				}
				this.stsSimpan = 1;
				this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kre_jual_m","no_jual",this.app._lokasi+"-OUT"+this.e_periode.getText().substr(2,4)+".","0000"));
				this.e_dok.setFocus();
				setTipeButton(tbSimpan);			
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		try {
			if (m < 10) m = "0" + m;			
			if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
			else {
				if (m == "12") this.e_periode.setText(this.app._periode);
				else this.e_periode.setText(y+""+m);
			}
			this.nik_user=this.app._userLog;						
			var sql = "call sp_kre_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);			
			if (this.stsSimpan == 1) this.doClick();
		}catch(e) {alert(e);}
	},
	doChange:function(sender){		
		if (sender == this.cb_pp && this.stsSimpan == 1) {
			this.sg.clear(1);
		}		
	},		
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Item",sender,undefined, 
											  "select kode_brg, nama from kre_brg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_brg) from kre_brg where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_brg","nama"],"and",["Kode","Nama"],false);				
			}

		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		if (col == 0 && this.sg.cells(0,row)!="") {
			if (this.sg.cells(0,row) != "") {
				sender.onChange.set(undefined,undefined);
				var obat = this.dataObat.get(sender.cells(0,row));
				if (obat) sender.cells(1,row,obat);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Barang "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkBrg");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
					sender.onChange.set(this,"doChangeCell");
					return false;
				}	
				sender.onChange.set(this,"doChangeCell");
			}			
			
			var strSQL = "select a.merk+' - '+a.tipe as pabrik,a.satuan,isnull(b.stok,0) as stok "+
						 "from kre_brg a left join kre_stok b on a.kode_brg=b.kode_brg and b.kode_lokasi=a.kode_lokasi and b.kode_pp='"+this.cb_pp.getText()+"' "+
			             "where a.kode_brg='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.sg.cells(2,row,line.pabrik);	
					this.sg.cells(3,row,line.satuan);	
					this.sg.cells(4,row,line.stok);	
					this.sg.cells(5,row,"0");	
				} 
				else {
					this.sg.cells(2,row,"");	
					this.sg.cells(3,row,"");	
					this.sg.cells(4,row,"");	
					this.sg.cells(5,row,"");	
				}
			}			
		}	
		this.sg.validasi();
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_kredit_rptBrgKeluar";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_jual='"+this.e_nb.getText()+"' ";
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
							this.dataObat = new portalui_arrayMap();							
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataObat.set(line.kode_brg,line.nama);
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			this.pc2.setActivePage(this.pc2.childPage[0]);
			setTipeButton(tbSimpan);	
			this.stsSimpan = 1;		
			this.nik_user=this.app._userLog;						
			var sql = "call sp_kre_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
			this.dbLib.execQuerySync(sql);				
		} catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){																		
		var strSQL = "select a.no_jual,convert(varchar,a.tanggal,103) as tgl,a.keterangan "+
		             "from kre_jual_m a "+
					 "where a.kode_pp='"+this.app._kodePP+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='OUT'";		
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
			this.sg3.appendData([line.no_jual,line.tgl,line.keterangan]); 
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
												
				var strSQL = "select * from kre_jual_m where no_jual = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.e_dok.setText(line.no_dokumen);		
						this.e_ket.setText(line.keterangan);							
						this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+line.kode_pp+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Gudang",true);									
						this.cb_pp.setText(line.kode_pp);						
					}
				}												
				
				this.nik_user=this.app._userLog;						
				var sql = "call sp_kre_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
				this.dbLib.execQuerySync(sql);	
										
				var strSQL = "select a.kode_brg,b.nama,b.merk+'-'+b.tipe as merk,b.satuan,a.jumlah,isnull(c.stok,0)+a.jumlah as stok "+
							 "from kre_jual_d a inner join kre_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
							 "                  left join kre_stok c on a.kode_brg=c.kode_brg and a.kode_lokasi=c.kode_lokasi and c.kode_pp='"+this.cb_pp.getText()+"' "+
							 "where a.no_jual='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";										
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg.appendData([line1.kode_brg,line1.nama,line1.merk,line1.satuan,parseFloat(line1.stok),parseFloat(line1.jumlah)]);
					}
				} else this.sg.clear(1);															
				this.sg.validasi();			
				
			}									
		} catch(e) {alert(e);}
	}
});