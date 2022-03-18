window.app_saku3_transaksi_ppbs_fPaPosting2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaPosting2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaPosting2";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Posting Transaksi", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;");
		this.c_tahun = new saiCB(this,{bound:[20,22,200,20],caption:"Tahun Anggaran",readOnly:true,tag:2, change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Posting",maxLength:30,readOnly:true, tag:2});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.bLoad = new button(this,{bound:[830,12,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.bPost = new button(this,{bound:[930,12,80,18],caption:"Posting All",click:[this,"doClick"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,13,1000,370], childPage:["Data PP","Data Usulan","Detail Usulan","Filter Data"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,				
				colTitle:["Status","Kode PP","Nama PP"],
				colWidth:[[2,1,0],[300,100,80]],
				columnReadOnly:[true,[1,2],[0]],	
				dblClick:[this,"doDoubleClick1"],			
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["PROSES","TIDAK"]})]],checkItem:true,
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});				
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan"],
					colWidth:[[4,3,2,1,0],[300,70,200,150,80]],
					columnReadOnly:[true,[0,1,2,3,4],[]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["POSTING","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:12,tag:9,
		            colTitle:["Kode Akun","Nama Akun","Kode DRK","Nama DRK","Kode PP","Nama PP","Uraian","Tarif","Satuan","Volume","Periode","Total"],
					colWidth:[[11,10,9,8,7,6,5,4,3,2,1,0],[100,100,100,80,100,250,150,80,150,80,150,80]],
					colFormat:[[7,9,10,11],[cfNilai,cfNilai,cfNilai,cfNilai]],
					readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		
		this.c_pp = new saiCB(this.pc1.childPage[3],{bound:[20,11,202,20],caption:"PP", readOnly:true,tag:9,change:[this,"doChange"]});
		this.cb_bukti = new saiCBBL(this.pc1.childPage[3],{bound:[20,22,220,20],caption:"Cari Bukti",readOnly:true,multiSelection:false,rightLabelVisible:false,tag:9,change:[this,"doChange"]});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);

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
			
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			this.c_tahun.setText("");
			this.c_tahun.setText(this.dbLib.getPeriodeFromSQL("select max(tahun) as periode from agg_tahun where kode_lokasi='"+this.app._lokasi+"' "));
			this.doClick(this.i_gen);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaPosting2.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaPosting2.implement({
	doLoad: function() {
		var pp = "";		
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i) && this.sg1.cells(0,i)=="PROSES") {
				pp += ",'"+this.sg1.cells(1,i)+"'";					
			}	
		}
		pp = pp.substr(1);
		if (pp == "") pp = "''";	

		var strSQL = "select 'INPROG' as status,a.no_usul,a.kode_pp,convert(varchar,a.tanggal,103) as tanggal,a.keterangan "+
				 	 "from agg_usul_m a  "+
					 "where a.kode_pp in ("+pp+") and a.no_jurnal='-' and a.tahun ='"+this.c_tahun.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						 					 
	
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataTmp = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);						
		this.pc1.setActivePage(this.pc1.childPage[1]);		
	},
	doTampilData: function(page) {		
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataTmp.rs.rows.length? this.dataTmp.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataTmp.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_usul,line.kode_pp,line.tanggal,line.keterangan]);
		}
		this.sg.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "") {
			var strSQL = "select a.kode_akun,b.nama as nama_akun,a.kode_drk,c.nama as nama_drk, a.kode_pp,d.nama as nama_pp, a.keterangan,a.tarif,a.satuan, a.periode,a.vol as volume,a.total "+
						 "from agg_d a "+
						 "inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+	
						 "inner join agg_drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and substring(a.periode,1,4)=c.tahun "+	
						 "inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+	
						 "where a.no_bukti = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_pp,a.kode_akun,a.kode_drk,a.periode desc";								
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.kode_drk,line.nama_drk,line.kode_pp,line.nama_pp,line.keterangan,floatToNilai(line.tarif),line.satuan,floatToNilai(line.volume),line.periode,floatToNilai(line.total)]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[2]);
		}
	},	

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

					sql.add("insert into agg_posting_m(no_post,kode_lokasi,periode,tanggal,modul,keterangan,nik_buat,nik_app,no_del,tgl_input,nik_user,nilai) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"',getdate(),'-','Generate Data Laporan Tahun :  "+this.c_tahun.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','-',getdate(),'"+this.app._userLog+"',0)");
				
					var line;
					for (var i=0;i < this.dataTmp.rs.rows.length;i++){
						line = this.dataTmp.rs.rows[i];
						if (line.status.toUpperCase() == "POSTING"){
							
							sql.add("insert into agg_posting_d(no_post,no_bukti,kode_lokasi) values "+							
									"('"+this.e_nb.getText()+"','"+line.no_bukti+"','"+this.app._lokasi+"')");
							
							sql.add("update agg_usul_m set no_jurnal='"+this.e_nb.getText()+"' where no_usul='"+line.no_bukti+"' and kode_lokasi='"+this.app._lokasi+"' and no_jurnal='-' ");

							//per no bukti
							//sql.add("exec sp_agg_proses '"+this.app._lokasi+"','"+this.e_periode.getText()+"'");		
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_posting_m","no_post",this.app._lokasi+"-AGG"+this.c_tahun.getText().substr(2,4)+".","000"));			
			setTipeButton(tbSimpan);
		}
		if (sender == this.bPost) {
			for (var i=0;i < this.dataTmp.rs.rows.length;i++){
				this.dataTmp.rs.rows[i].status = "POSTING";
			}
			this.doTampilData(this.page);
		}
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataTmp.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
		}
	},
	doChange:function(sender){
		if (sender==this.c_tahun && this.c_tahun.getText()!="") {
			this.c_pp.items.clear();			
			var strSQL = "select a.kode_pp, a.nama from agg_pp a inner join agg_user b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='"+this.app._userLog+"' where a.kode_lokasi='"+this.app._lokasi+"' and a.flag_aktif='1' and a.tahun='"+this.c_tahun.getText()+"'";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sg1.appendData(["PROSES",line.kode_pp.toUpperCase(),line.nama]);
					this.c_pp.addItem(i,line.modul);
				}
			} else this.sg1.clear(1);

			this.c_pp.setText("");
			this.dataTmp = {rs:{rows:[]}};
		}
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
