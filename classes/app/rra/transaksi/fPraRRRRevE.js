window.app_rra_transaksi_fPraRRRRevE = function(owner)
{
	if (owner)
	{
		window.app_rra_transaksi_fPraRRRRevE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fPraRRRRevE";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Draft PRDRK Redistribusi, Realokasi, Reschedule Anggaran: Review", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;reportViewer;server_report_report");
		this.e_periode = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,222,20],caption:"No Approve",maxLength:30,readOnly:true, multiSelection:false, change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.c_modul = new saiCB(this,{bound:[20,22,200,20],caption:"Modul",items:["RRR","ABT"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.i_postAll = new imageButton(this,{bound:[225,22,20,20],hint:"App All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,287], childPage:["Data RRA","Detail Transaksi","PDRK"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:6,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","Jenis"],
					colWidth:[[5,4,3,2,1,0],[50,290,70,200,150,80]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new arrayMap({items:["APP","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:10,tag:9,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Jenis","Nilai","Target"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[100,130,80,150,70,60,60,150,70,50]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[]],
					colFormat:[[8],[cfNilai]],
					defaultRow:1,autoAppend:false});
		this.sgn2 = new sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});
		this.viewer = new reportViewer(this.pc1.childPage[2],{bound:[0,0,this.pc1.width - 3, this.pc1.height - 25]});
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.info = "";		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_modul.setText("");
			this.onClose.set(this,"doClose");
			this.e_nb.setSQL("select a.no_app, a.keterangan, b.no_bukti as no_pdrk, c.keterangan as desk "+
				"	from rra_app_m a inner join rra_app_d b on b.no_app = a.no_app and b.kode_lokasi = a.kode_lokasi "+
				"	inner join  rra_pra_m c on c.no_pdrk = b.no_bukti and c.kode_lokasi = b.kode_lokasi  and c.kode_ubis = '"+this.app._kodeUbis+"'  "+
				" where a.kode_lokasi = '"+this.app._lokasi+"'and c.progress = '1'",
				["no_app","keterangan","no_pdrk","desk"],false,["No Approval","Keterangan","No Draft PDRK","Deskripsi PDRK"],"and","Data Approval Draft PDRK ("+this.app._nmUbis+")",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_transaksi_fPraRRRRevE.extend(window.childForm);
window.app_rra_transaksi_fPraRRRRevE.implement({
	doClose: function(sender){
		this.dbLib.free();		
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", (this.info != "" ? this.info +"<br>": "" )+"screen akan dibersihkan?","form inputan ini akan dibersihkan");	
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
					sql.add("update rra_app_m set tanggal='"+this.dp_d1.getDateString()+"',keterangan='"+this.e_ket.getText()+"' "+
							",modul='"+this.c_modul.getText()+"',periode='"+this.e_periode.getText()+"' "+
							" where no_app ='"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
					var line;
					sql.add("update rra_pra_m set progress = '0' where progress ='1' and no_pdrk in (select no_bukti from rra_app_d where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"') and kode_lokasi='"+this.app._lokasi+"' ");
					sql.add("delete from rra_app_d where no_app = '"+this.e_nb.getText()+"' and kode_lokasi  = '"+this.app._lokasi +"'");
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "APP"){
							sql.add("insert into rra_app_d(no_app,modul,no_bukti,kode_lokasi,sts_pdrk,catatan) values "+
									"('"+this.e_nb.getText()+"','"+this.c_modul.getText()+"','"+line.no_bukti+"','"+this.app._lokasi+"','-','"+line.no_dokumen+"')");
						}
					}				
					sql.add("update rra_pra_m set progress = '1' where no_pdrk in (select no_bukti from rra_app_d where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"') and kode_lokasi='"+this.app._lokasi+"' ");
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
	hapus: function(){
		try{															
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();
			sql.add("update rra_pra_m set progress = '0' where no_pdrk in (select no_bukti from rra_app_d where no_app='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"') and kode_lokasi='"+this.app._lokasi+"' ");
			sql.add("delete from  rra_app_d where no_app = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");					
			sql.add("delete from  rra_app_m where no_app = '"+this.e_nb.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");											
			setTipeButton(tbAllFalse);					
			this.dbLib.execArraySQL(sql);
		}
		catch(e){
			system.alert(this, e,"");
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.c_modul.setText("");
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
					this.info = "";
				break;
			case "ubah" :					
				var isAda = false;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					if (this.dataJU.rs.rows[i].status == "APP") isAda = true;
				}
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status APP.");
					return false;
				}
				else this.simpan();
				break;				
					
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
	},
	doClick:function(sender){		
		if (sender == this.i_postAll) {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "APP";
			}
			this.doTampilData(this.page);
		}
	},
	doChange:function(sender){		
		if (sender == this.e_nb){
			try{								
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
							   "select date_format(a.tanggal,'%d-%m-%Y') as tanggal, a.keterangan, a.modul   "+
							   "from rra_app_m a "+
							   "where a.no_app ='"+sender.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
							   "select a.sts_pdrk, a.progress, 'APP' as status,a.no_pdrk as no_bukti,a.no_pdrk as no_dokumen,date_format(a.tanggal,'%d-%m-%Y') as tanggal,a.keterangan,a.jenis_agg as jenis "+
											 "from rra_pra_m a "+
											 " inner join rra_app_d b on b.no_bukti = a.no_pdrk and b.kode_lokasi = a.kode_lokasi  "+
											 "where b.no_app = '"+ sender.getText()+"' and progress = '1' and a.kode_lokasi='"+this.app._lokasi+"'"
							   ]}),true);										
					if (typeof data == "object"){
						var line = data.result[0].rs.rows[0];
						if (line != undefined){					
							this.dp_d1.setText(line.tanggal);
							this.e_ket.setText(line.keterangan);					
							this.c_modul.setText(line.modul);						
							setTipeButton(tbUbahHapus);	
						} 										
						this.sg.clear(); 					
						data = data.result[1];
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							this.dataJU = data;
							this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
							this.sgn.rearrange();
							this.doTampilData(1);
						} else {
							this.sg.clear(1);				
						}
					}else throw (data);
										
			}catch(e){
				error_log(e);
			}
		}		
	},
	doTampilData: function(page) {
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.status.toUpperCase(),line.no_bukti,line.no_dokumen,line.tanggal,line.keterangan,line.jenis.toUpperCase()]);
		}
		this.sg.setNoUrut(start);
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "") {
			this.sg2.clear();
			var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'TERIMA' else 'DONOR' end as dc,a.target "+
			             "from rra_pra_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
						 "				   inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "				   left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
			             "where a.no_pdrk = '"+this.sg.cells(1,row)+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,line.dc.toUpperCase(),floatToNilai(line.nilai),line.target]);
				}
				this.report = new server_report_report();
				this.filter = "where a.no_pdrk = '"+this.sg.cells(1,row)+"'";
				this.filter2 = "/"+this.app._periode+"/"+this.c_modul.getText()+"/"+this.app._kodeUbis+"/"+this.app._namaForm;									
				var url = [
					this.report.previewWithHeader("server_report_rra_rptPdrk1Pra",this.filter, 1,  1, this.showFilter, this.app._namaLokasi,this.filter2),
					this.report.previewWithHeader("server_report_rra_rptPdrk2Pra",this.filter, 1,  1, this.showFilter, this.app._namaLokasi,this.filter2)					
					];
				this.viewer.previewMultiPage(url, true, ["PDRK-1","PDRK-2"]);				
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
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
							//system.info(this,);
							this.info = "transaksi telah sukses tersimpan<br>(No Bukti : "+ this.e_nb.getText()+")";
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
