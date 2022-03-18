window.app_saku3_transaksi_sla_fKartuSLA = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sla_fKartuSLA.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sla_fKartuSLA";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kartu SLA", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Kartu","Daftar Kartu"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["No Kartu","Kode Mitra","Nama","Nilai"],
					colWidth:[[3,2,1,0],[100,250,100,100]],
					readOnly:true,colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad1"]});		
			
		this.cb_mitra = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"Data Mitra",tag:1, multiSelection:false, change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Kartu",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.e_dok1 = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,300,20],caption:"Dok TELKOM",maxLength:50});
		this.e_dok2 = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,300,20],caption:"Dok Mitra",maxLength:50});
		this.l_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Akta Kredit", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],date:new Date().getDateStr()});
		this.e_ket = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,500,20],caption:"Tujuan Kredit",maxLength:200});
		this.c_jenis = new portalui_saiCB(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Jenis Angsuran",items:["FLAT"],tag:2,readOnly:true, visible:false});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,20,995,278], childPage:["Data Pinjaman","Schedule Angsuran"]});				
		this.c_curr = new saiCB(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"Currency",readOnly:true,tag:2});		
		this.e_nilai = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,29,200,20],caption:"Nilai Pinjaman", tipeText:ttNilai, text:"0"});
		this.l_tgl2 = new portalui_label(this.pc2.childPage[0],{bound:[20,13,100,18],caption:"Tgl Awal Penarikan", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[0],{bound:[120,13,98,18],date:new Date().getDateStr()});
		this.e_bunga = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,200,20],caption:"Bunga(%)",tipeText:ttNilai, text:"0"});
		this.e_jibor = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,15,200,20],caption:"JIBOR(%)",tipeText:ttNilai, text:"0"});
		this.e_rate = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,16,200,20],caption:"JIBOR(%)+",tipeText:ttNilai, text:"0"});
		this.e_basis = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Basis Hari",tipeText:ttNilai, text:"0"});		
		this.e_lama = new portalui_saiLabelEdit(this.pc2.childPage[0], {bound:[20,30,200,20],caption:"Lama Bayar (Thn)",tipeText:ttNilai, text:"0"});
		this.e_gp = new portalui_saiLabelEdit(this.pc2.childPage[0], {bound:[20,31,200,20],caption:"Grace Period (Thn)",tipeText:ttNilai, text:"0"});
		this.e_angsurpokok = new portalui_saiLabelEdit(this.pc2.childPage[0], {bound:[20,33,200,20],caption:"Ang. Pokok (Bulan)",tipeText:ttNilai, text:"0"});
		this.e_angsurbunga = new portalui_saiLabelEdit(this.pc2.childPage[0], {bound:[20,34,200,20],caption:"Ang. Bunga (Bulan)",tipeText:ttNilai, text:"0"});		
		this.bHitung = new button(this.pc2.childPage[0],{bound:[240,34,80,20],caption:"Schedule", click:[this,"generateSch"]});
		
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:8,tag:0,
				colTitle:["Tgl Tagih","Status","JmlHari","JIBOR","% Bunga","Angs Pokok","Saldo Pokok","Pdpt Bunga"],
				colWidth:[[7,6,5,4,3,2,1,0],[100,100,100,60,60,60,80,80]],
				columnReadOnly:[true,[0],[]],				
				colFormat:[[2,3,4,5,6,7],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:bsAll,grid:this.sg});
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
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
			
			this.cb_mitra.setSQL("select kode_mitra,nama from sla_mitra where kode_lokasi = '"+this.app._lokasi+"'",["kode_mitra","nama"],false,["Kode","Nama"],"and","Data Mitra",true);						
			this.c_jenis.setText("FLAT");
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
			
			this.dp_d2.setText("17/09/2014");
			this.e_bunga.setText("1,2");
			this.e_jibor.setText("8,09062");
			this.e_rate.setText("2,25");
			this.e_basis.setText("360");
			this.e_nilai.setText("1.000.084.000.000");
			this.e_lama.setText("7");
			this.e_gp.setText("2");
			this.e_angsurpokok.setText("6");
			this.e_angsurbunga.setText("3");
		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sla_fKartuSLA.extend(window.portalui_childForm);
window.app_saku3_transaksi_sla_fKartuSLA.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from sla_m where no_sla = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sla_sch where no_sla = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					var thnBln = this.dp_d1.getDateString().substr(0,4) + this.dp_d1.getDateString().substr(5,2);
					sql.add("insert into sla_m (no_sla,kode_mitra,no_dok1,no_dok2,tanggal,keterangan,tgl_tarik,bunga,jibor,jibor_p,basis,nilai,lama,gp,lama_pokok,lama_bunga,periode,nik_user,tgl_input,kode_lokasi,kode_curr) values "+
					        "('"+this.e_nb.getText()+"','"+this.cb_mitra.getText()+"','"+this.e_dok1.getText()+"','"+this.e_dok2.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_bunga.getText())+","+nilaiToFloat(this.e_jibor.getText())+","+nilaiToFloat(this.e_rate.getText())+","+nilaiToFloat(this.e_basis.getText())+","+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_lama.getText())+","+nilaiToFloat(this.e_gp.getText())+","+nilaiToFloat(this.e_angsurpokok.getText())+","+nilaiToFloat(this.e_angsurbunga.getText())+",'"+thnBln+"','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.c_curr.getText()+"')");							
					
					for (var i=0; i < this.sg.getRowCount(); i++){					
					  var vPeriod = this.sg.cells(0,i).substr(0,4) + this.sg.cells(0,i).substr(5,2);
					  sql.add("insert into sla_sch (no_sla,kode_lokasi,nu,tgl_tempo,jenis,jml_hari,jibor,p_bunga,sa_pokok,npokok,npdpt,periode,no_akru,kode_curr,kurs) values "+
						      "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(6,i))+","+nilaiToFloat(this.sg.cells(5,i))+","+nilaiToFloat(this.sg.cells(7,i))+",'"+vPeriod+"','-','"+this.c_curr.getText()+"',0)");
							  
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);							
				}
				break;
			
			case "simpan" :	
			case "ubah" :	this.simpan();
				break;
			
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from sla_m where no_sla = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from sla_sch where no_sla = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);								
				break;				
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.cb_mitra && this.cb_mitra.getText()!=""&& this.stsSimpan == 1) this.e_nb.setText("");						
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doClick:function(sender){
		try {			
			var thn = this.dp_d1.getDateString().substr(2,2);
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sla_m","no_sla",this.app._lokasi+"-SLA"+thn+".","0000"));		
		    this.e_dok1.setFocus();
			setTipeButton(tbSimpan);
		}
		catch (e) {
			alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
			this.sg1.clear(1); this.sg.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad1:function(sender){																		
		if (this.cb_mitra.getText() == "") var filter = ""; else var filter = "a.kode_mitra = '"+this.cb_mitra.getText()+"' and ";		
		var strSQL = "select a.no_sla,a.kode_mitra,c.nama,a.nilai "+
		             "from sla_m a inner join sla_mitra c on a.kode_mitra=c.kode_mitra and a.kode_lokasi=c.kode_lokasi "+
					 "			   left join (select kode_lokasi,no_sla from sla_sch where kode_lokasi='"+this.app._lokasi+"' and no_akru<>'-') b on a.no_sla=b.no_sla and a.kode_lokasi=b.kode_lokasi "+
					 "where "+filter+" a.kode_lokasi='"+this.app._lokasi+"' and b.no_sla is null";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU1 = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData1(1);
		} else this.sg1.clear(1);			
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg1.appendData([line.no_sla,line.kode_mitra,line.nama,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg1.cells(0,row));								
								
				var strSQL = "select * "+
							 "from sla_m "+							 
							 "where no_sla = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.c_curr.setText(line.kode_curr);
						this.cb_mitra.setText(line.kode_mitra);
						this.dp_d1.setText(line.tanggal);						
						this.e_dok1.setText(line.no_dok1);
						this.e_dok2.setText(line.no_dok2);
						this.e_ket.setText(line.keterangan);
						this.c_jenis.setText("FLAT");						
						this.dp_d2.setText(line.tgl_tarik);
						this.e_bunga.setText(floatToNilai(line.bunga));
						this.e_jibor.setText(floatToNilai(line.jibor));
						this.e_rate.setText(floatToNilai(line.jibor_p));
						this.e_basis.setText(floatToNilai(line.basis));
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_lama.setText(floatToNilai(line.lama));
						this.e_gp.setText(floatToNilai(line.gp));
						this.e_angsurpokok.setText(floatToNilai(line.lama_pokok));
						this.e_angsurbunga.setText(floatToNilai(line.lama_bunga));
						
						var strSQL = "select * from sla_sch where kode_lokasi='"+this.app._lokasi+"' and no_sla='"+this.e_nb.getText()+"' order by nu";
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];																										
								this.sg.appendData([line.tgl_tempo.substr(0,10),line.jenis,floatToNilai(line.jml_hari),floatToNilai(line.jibor),floatToNilai(line.p_bunga),floatToNilai(line.npokok),floatToNilai(line.sa_pokok),floatToNilai(line.npdpt)]);
							}
						} else this.sg.clear(1);													
					}
				}					
			}									
		} catch(e) {alert(e);}
	},	
	generateSch: function(){
	    try{	
			var strSQL = "select datediff(month,'"+this.dp_d2.getDateString()+"',DATEADD(YEAR,"+nilaiToFloat(this.e_lama.getText())+",'"+this.dp_d2.getDateString()+"')) as jml_bulan";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){				
				var line = data.rs.rows[0];											
				if (line != undefined){							
					var jmlBln = line.jml_bulan;				
				}								
			}
			var strSQL = "select DATEADD(YEAR,"+nilaiToFloat(this.e_lama.getText())+",'"+this.dp_d2.getDateString()+"') as tgl_akhir";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){				
				var line = data.rs.rows[0];											
				if (line != undefined){							
					var tglAkhir = line.tgl_akhir;				
				}								
			}
			
			var perAwal = this.dp_d2.getThnBln();
			var tgl = this.dp_d2.getText().substr(0,2);
			if (parseInt(tgl) > 28) tgl = "28";
			var tglAngsur = perAwal.substr(0,4) + '-' + perAwal.substr(4,2) + '-' +  tgl;
			var batasHariBunga = nilaiToFloat(this.e_angsurbunga.getText()) * 30;
			var batasHariPokok = nilaiToFloat(this.e_angsurpokok.getText()) * 30;
			
			var datDate1,datDate2;
			var jmlHari = 0;
			
			//------------------ SCH TANGGAL BUNGA DAN BAYAR
			for (var i = 0;i < jmlBln;i++) {
				var d = new Date(perAwal.substr(0,4),perAwal.substr(4,2),0);
				var dAkhir = d.getDate();
				tglNext = perAwal.substr(0,4) + '-' + perAwal.substr(4,2) + '-' +  dAkhir;
				tglAngsurNext = perAwal.substr(0,4) + '-' + perAwal.substr(4,2) + '-' +  tgl;
				
				datDate1 = Date.parse(tglAngsur);
				datDate2 = Date.parse(tglAngsurNext);				
				jmlHari = (datDate2-datDate1) / (24*60*60*1000);							
				if (jmlHari >= (batasHariBunga)) {
					this.sg.appendData([tglAngsurNext,"BAYAR","0","0","0","0","0","0"]);
					tglAngsur = tglAngsurNext;							
				}				
				this.sg.appendData([tglNext,"BUNGA","0","0","0","0","0","0"]);								
				perAwal = getNextPeriode(perAwal);								
			}
			this.sg.appendData([tglAkhir.substr(0,10),"BAYAR","0","0","0","0","0","0"]);								
			
			
			//------------------ SCH JML HARI, ANGS POKOK 
			var jibor = Math.round(nilaiToFloat(this.e_jibor.getText()) * 1000000) / 1000000;
			var rate = Math.round(nilaiToFloat(this.e_bunga.getText()) * (nilaiToFloat(this.e_jibor.getText()) + nilaiToFloat(this.e_rate.getText())) * 1000000)/1000000;			
			var strSQL = "select DATEADD(YEAR,"+nilaiToFloat(this.e_gp.getText())+",'"+this.dp_d2.getDateString()+"') as tgl_angspokok";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){				
				var line = data.rs.rows[0];											
				if (line != undefined){							
					var tglAngsPokok = line.tgl_angspokok.substr(0,10);				
				}								
			}			
			var jmlPokok = 0;
			for (var i = 0;i < this.sg.getRowCount();i++) {
				if (i == 0) jmlHari = 1;
				else {					
					datDate1 = Date.parse(this.sg.cells(0,i-1));
					datDate2 = Date.parse(this.sg.cells(0,i));				
					jmlHari = (datDate2-datDate1) / (24*60*60*1000);
				}			
				this.sg.cells(2,i,floatToNilai(jmlHari));
				this.sg.cells(3,i,floatToNilai(jibor));
				this.sg.cells(4,i,floatToNilai(rate));
				
				datDate1 = Date.parse(tglAngsPokok);
				datDate2 = Date.parse(this.sg.cells(0,i));				
				jmlHari = (datDate2-datDate1) / (24*60*60*1000);
				if (jmlHari >= (batasHariPokok)) {
					this.sg.cells(5,i,"1");
					tglAngsPokok = this.sg.cells(0,i);
					jmlPokok++;
				}	
			}
			
			//------------------ UPDATE NILAI POKOK DAN BUNGA
			var nPokok = Math.round(nilaiToFloat(this.e_nilai.getText()) / jmlPokok);			
			var saPokok = nilaiToFloat(this.e_nilai.getText());
			var pdpt = 0;
			for (var i = 0;i < this.sg.getRowCount();i++) {
				if (this.sg.cells(5,i) == "1") {
					this.sg.cells(5,i,floatToNilai(nPokok));					
					saPokok -= nPokok;
				}				
				this.sg.cells(6,i,floatToNilai(saPokok));
				
				if (i == 0) pdpt = Math.round(nilaiToFloat(this.sg.cells(6,i)) * nilaiToFloat(this.sg.cells(2,i)) / nilaiToFloat(this.e_basis.getText()) * nilaiToFloat(this.sg.cells(4,i)) / 100);
				else pdpt = Math.round(nilaiToFloat(this.sg.cells(6,i-1)) * nilaiToFloat(this.sg.cells(2,i)) / nilaiToFloat(this.e_basis.getText()) * nilaiToFloat(this.sg.cells(4,i)) / 100);
				
				this.sg.cells(7,i,floatToNilai(pdpt));
			}
			
			this.pc2.setActivePage(this.pc2.childPage[1]);			
		}
		catch(e) {
			alert(e);
		}
	}
	
});

