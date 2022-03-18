window.app_saku3_transaksi_gl_fRefSimple = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_gl_fRefSimple.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_gl_fRefSimple";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Referensi: Input", 0);	
		
		uses("portalui_uploader;saiCBB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.cb_lokasi = new portalui_saiCBBL(this,{bound:[20,15,200,20],caption:"Lokasi",multiSelection:false,tag:2,change:[this,"doChange"]});

		this.pc1 = new pageControl(this,{bound:[20,12,1000,470], childPage:["Data Referensi","Detail Jurnal","Filter Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Modul","Deskripsi","Currency"],
					colWidth:[[3,2,1,0],[100,500,100,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});		
		
		this.c_modul = new saiCB(this.pc1.childPage[1],{bound:[20,11,180,20],caption:"Modul",items:["KB","JU"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.c_curr = new saiCB(this.pc1.childPage[1],{bound:[20,16,180,20],caption:"Currency",readOnly:true,tag:2});			
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_debet = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,12,200,20],caption:"Total Debet", tag:1, tipeText:ttNilai, text:"0",readOnly:true});				
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,550,20],caption:"Deskripsi", maxLength:150});				
		this.e_kredit = new saiLabelEdit(this.pc1.childPage[1],{bound:[790,17,200,20],caption:"Total Kredit", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-135],colCount:7,tag:0,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,150,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.e_ket2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,17,550,20],caption:"Deskripsi", maxLength:150,tag:9});				
		this.bCari = new button(this.pc1.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);			
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where flag_konsol='0'",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_lokasi.setText(this.app._lokasi);
			
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("IDR");			
			this.c_modul.setText("KB");			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_gl_fRefSimple.extend(window.childForm);
window.app_saku3_transaksi_gl_fRefSimple.implement({
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
					if (this.stsSimpan == "1") {
						this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"jurnalref_m","no_bukti",this.app._lokasi+"-REF.","0000"));
					}
					else {
						sql.add("delete from jurnalref_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from jurnalref_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}					
					sql.add("insert into jurnalref_m (no_bukti,kode_lokasi,keterangan,kode_curr,modul) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.c_curr.getText()+"','"+this.c_modul.getText()+"')");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){								
 								sql.add("insert into jurnalref_j(no_bukti,no_urut,kode_akun,keterangan,dc,nilai,kode_lokasi,kode_pp,kode_drk,kode_cf) values "+
										"('"+this.e_nb.getText()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg.cells(4,i))+",'"+this.cb_lokasi.getText()+"','"+this.sg.cells(5,i)+"','-','-')");
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
				break;
			case "simpan" :																	
				this.stsSimpan = "1";
				this.dataAkunProd = {rs:{rows:[]}};							
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
				
				if (this.c_modul.getText() == "KB") {
					this.dataJU = {rs:{rows:[]}};
					var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						this.dataJU = data;
					} 
					var akunKB = false;
					var k=0;
					for (var j=0;j < this.sg.getRowCount();j++){
						if (this.sg.rowValid(j)){
							for (var i=0;i<this.dataJU.rs.rows.length;i++){
								line = this.dataJU.rs.rows[i];
								if (line.kode_akun == this.sg.cells(0,j)) {
									akunKB = true;								
								}
							}
						}
					}
					if (!akunKB) {
						system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak ditemukan (Modul = KB).");
						return false;						
					}
				}				
				this.sg.validasi();											
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;							
			case "ubah" :																	
				this.stsSimpan = "2";								
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
				if (this.c_modul.getText() == "KB") {
					this.dataJU = {rs:{rows:[]}};
					var data = this.dbLib.getDataProvider("select kode_akun from flag_relasi where kode_flag in ('001','009') and kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						this.dataJU = data;
					} 
					var akunKB = false;
					var k=0;
					for (var j=0;j < this.sg.getRowCount();j++){
						if (this.sg.rowValid(j)){
							for (var i=0;i<this.dataJU.rs.rows.length;i++){
								line = this.dataJU.rs.rows[i];
								if (line.kode_akun == this.sg.cells(0,j)) {
									akunKB = true;								
								}
							}
						}
					}
					if (!akunKB) {
						system.alert(this,"Transaksi tidak valid.","Akun KasBank tidak ditemukan (Modul = KB).");
						return false;						
					}
				}				
				this.sg.validasi();											
				this.simpan();
				break;				
			case "hapus" :	
				this.stsSimpan = "3";
			    uses("server_util_arrayList");
				var sql = new server_util_arrayList();								
				sql.add("delete from jurnalref_m where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from jurnalref_j where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;					
		}
	},		
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"jurnalref_m","no_bukti",this.app._lokasi+"-REF.","0000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);	
		this.sg.clear(1);		
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.e_nb.setText(this.sg1.cells(0,row));	
				this.c_modul.setText(this.sg1.cells(1,row));
				this.e_ket.setText(this.sg1.cells(2,row));
				this.c_curr.setText(this.sg1.cells(3,row));
								
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.dc,a.nilai,a.keterangan  "+
				           "from jurnalref_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						   "                   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+						   
				           "where a.no_bukti='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sg.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg.clear(1);
				this.sg.validasi();				
			}
		} catch(e) {alert(e);}
	},
	doChange:function(sender){
		if ((sender == this.cb_lokasi || sender == this.c_modul) && this.cb_lokasi.getText()!="" && this.c_modul.getText()!="") {
			if (this.c_modul.getText()=="KB") this.flagAkun = "035";
			if (this.c_modul.getText()=="JU") this.flagAkun = "034";
			
			var sql = new server_util_arrayList();			
			sql.add("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '"+this.flagAkun+"' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("select kode_pp,nama from pp where kode_lokasi = '"+this.cb_lokasi.getText()+"' and flag_aktif='1'");			
			this.dbLib.getMultiDataProviderA(sql);
		}
		this.doLoad();
	},		
	doChangeCell: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 5) {
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != ""){
					if (this.sg.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg.cells(4,i));
					if (this.sg.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doCellEnter: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg.cells(2,row) == ""){
						this.sg.setCell(2,row,"D");						
					}
				break;
			case 3 : 
					if (this.sg.cells(3,row) == ""){
						if (row == 0) this.sg.setCell(3,row,this.e_ket.getText());
						else this.sg.setCell(3,row,this.sg.cells(3,(row-1)) );
					}
				break;
			case 4 : 
					if (this.sg.cells(4,row) == "" && row > 0) {
						var sls = nilaiToFloat(this.e_debet.getText()) - nilaiToFloat(this.e_kredit.getText());
						sls = Math.abs(sls); 
						this.sg.setCell(4,row,floatToNilai(sls));
					}
				break;
			case 5 : 
					if (this.sg.cells(5,row) == "") {
						if (row == 0) this.sg.setCell(5,row,this.app._kodePP);
						else {
							this.sg.setCell(5,row,this.sg.cells(5,(row-1)));
							this.sg.setCell(6,row,this.sg.cells(6,(row-1)));
						}
					}
				break;			
		}
	},	
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					if (this.c_modul.getText()=="KB") this.flagAkun = "035";					
					if (this.c_modul.getText()=="JU") this.flagAkun = "034";
					
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '"+this.flagAkun+"' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag = '"+this.flagAkun+"' where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
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
							if (this.stsSimpan != "3") {
								this.nama_report="server_report_saku3_gl_rptJuJurnalBukti";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.e_nb.getText()+"' ";
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
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();							
							this.dataPP = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}							
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];
									this.dataPP.set(line.kode_pp, line.nama);
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); 
			this.doLoad();
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},	
	doLoad:function(sender){						
		if (this.cb_lokasi.getText()!="") {
			var strSQL = "select * from jurnalref_m where kode_lokasi='"+this.cb_lokasi.getText()+"' ";		
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
		}
	},	
	doCari:function(sender){								
		var filter = " and keterangan like '%"+this.e_ket2.getText()+"%' ";		
		var strSQL = "select * from jurnalref_m where kode_lokasi='"+this.cb_lokasi.getText()+"' "+filter;
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);				
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_bukti,line.modul,line.keterangan,line.kode_curr]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});