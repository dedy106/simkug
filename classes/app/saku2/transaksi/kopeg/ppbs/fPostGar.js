window.app_saku2_transaksi_kopeg_ppbs_fPostGar = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_ppbs_fPostGar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_ppbs_fPostGar";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load & Posting Data Usulan: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;portalui_uploader");
		this.c_tahun = new saiCB(this,{bound:[20,22,180,20],caption:"Tahun Anggaran",readOnly:true,tag:2,change:[this,"doChange"]});					
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.i_Load = new portalui_imageButton(this,{bound:[255,12,20,20],hint:"Tampil Data Usulan",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoad"]});				
				
		this.bUpload = new portalui_uploader(this,{bound:[840,12,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,450], childPage:["Ambil Data Usulan","Load Jurnal Usulan"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:17,tag:9,
				colTitle:["Kode Akun","DC","Nama","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des","Total","Kode CF"],				
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80, 100, 80,80,80,80,80,80,80,80,80,80,80,80 ,150,40,80]],
				colFormat:[[3,4,5,6,7,8,9,10,11,12,13,14,15],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg});
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:17,tag:0,				
				colTitle:["Kode Akun","DC","Nama","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des","Total","Kode CF"],
				colWidth:[[16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[80, 100, 80,80,80,80,80,80,80,80,80,80,80,80 ,150,40,80]],
				colFormat:[[3,4,5,6,7,8,9,10,11,12,13,14,15],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:2, grid:this.sg1, pager:[this,"selectPage"]});
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.sgn.uploader.setParam3("object");
			this.sg1.setAllowBlank(true);
			
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
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('AKUNKOMA') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "AKUNKOMA") this.akunKoma = line.flag;								
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_ppbs_fPostGar.extend(window.childForm);
window.app_saku2_transaksi_kopeg_ppbs_fPostGar.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 1000));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 1000;
		var finish = start + 1000;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];			
			this.sg1.appendData([line.kode_akun, line.dc, line.nama, floatToNilai(line.jan), floatToNilai(line.feb), floatToNilai(line.mar), 
								 floatToNilai(line.apr), floatToNilai(line.mei), floatToNilai(line.jun), floatToNilai(line.jul), floatToNilai(line.agu), 
								 floatToNilai(line.sep), floatToNilai(line.okt), floatToNilai(line.nov), floatToNilai(line.des),floatToNilai(line.total),line.kode_cf,line.kode_bidang]);
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[1]);
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_post_m','no_post',this.app._lokasi+"-POAG"+this.c_tahun.getText()+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from agg_post_m where modul = 'AG' and tahun = '"+this.c_tahun.getText()+"'");
					sql.add("delete from agg_gldt where modul = 'AG' and periode like '"+this.c_tahun.getText()+"%'");
					
					sql.add("insert into agg_post_m(no_post, kode_lokasi, modul, tgl_input, nik_user, tahun) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','AG',getdate(),'"+this.app._userLog+"','"+this.c_tahun.getText()+"')");

					var idx=0;
					for (var i=0;i< this.sg1.getRowCount();i++){
						if (this.sg1.rowValid(i)){
							idx++;
							for (var j=1;j<13;j++){
								var k=j+2;
								if (this.sg1.cells(k,i) != "0") {
									this.periode = this.c_tahun.getText() + (j<10?"0":"")+j;
									var tgl = this.c_tahun.getText()+"-"+(j<10?"0":"")+j+"-01";
									var nilai = nilaiToFloat(this.sg1.cells(k,i));
									sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cf) values "+
											"('"+this.e_nb.getText()+"',"+idx+",'"+this.app._lokasi+"','AG','-','-','"+tgl+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"',"+nilai+",'"+this.sg1.cells(2,i)+"','-','"+this.periode+"','-','IDR',1,"+nilai+",getdate(),'"+this.app._userLog+"','"+this.sg1.cells(16,i)+"')");
								}
							
							}
						}
					}					
					sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cf) "+
							"select '"+this.e_nb.getText()+"',9999,'"+this.app._lokasi+"','AG','KOMA','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','"+this.akunKoma+"',case when sum(case dc when 'D' then nilai else -nilai end)<0 then 'D' else 'C' end,abs(sum(case dc when 'D' then nilai else -nilai end)),'-','0',periode,'-','IDR',1,abs(sum(case dc when 'D' then nilai else -nilai end)),getdate(),'"+this.app._userLog+"','-' "+
							"from agg_gldt where periode like '"+this.c_tahun.getText()+"%'  and modul='AG' group by periode");		
					
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
					this.sg.clear(1); this.sg1.clear(1);  
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
					this.simpan();
				break;							
		}	
	},		
	doLoad:function(sender){		
		if (this.c_tahun.getText() != "") {						
			var strSQL = "select a.kode_akun,a.nama, case when a.jenis = 'Pendapatan' then 'C' else 'D' end as dc, "+
					"cast(round(isnull(b.jan,0),0) as decimal) as jan, "+
					"cast(round(isnull(c.feb,0),0) as decimal) as feb, "+
					"cast(round(isnull(d.mar,0),0) as decimal) as mar, "+
					"cast(round(isnull(e.apr,0),0) as decimal) as apr, "+
					"cast(round(isnull(f.mei,0),0) as decimal) as mei, "+
					"cast(round(isnull(g.jun,0),0) as decimal) as jun, "+
					"cast(round(isnull(h.jul,0),0) as decimal) as jul, "+
					"cast(round(isnull(i.agu,0),0) as decimal) as agu, "+
					"cast(round(isnull(j.sep,0),0) as decimal) as sep, "+
					"cast(round(isnull(k.okt,0),0) as decimal) as okt, "+
					"cast(round(isnull(l.nov,0),0) as decimal) as nov, "+
					"cast(round(isnull(m.des,0),0) as decimal) as des, "+
					"cast(round(isnull(b.jan,0)+isnull(c.feb,0)+isnull(d.mar,0)+isnull(e.apr,0)+isnull(f.mei,0)+isnull(g.jun,0)+isnull(h.jul,0)+isnull(i.agu,0)+isnull(j.sep,0)+isnull(k.okt,0)+isnull(l.nov,0)+isnull(m.des,0),0) as decimal) as total "+
					"from masakun a  "+
					"	left join  "+
					"	( "+
					"	select kode_lokasi,kode_akun,sum(total) as jan from agg_usul_j "+
					"	where periode = '"+this.c_tahun.getText()+"01' "+
					"	group by kode_lokasi,kode_akun "+
					"	) b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+

					"	left join  "+
					"	( "+
					"	select kode_lokasi,kode_akun,sum(total) as feb from agg_usul_j "+
					"	where periode = '"+this.c_tahun.getText()+"02' "+
					"	group by kode_lokasi,kode_akun "+
					"	) c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					
					"	left join  "+
					"	( "+
					"	select kode_lokasi,kode_akun,sum(total) as mar from agg_usul_j "+
					"	where periode = '"+this.c_tahun.getText()+"03' "+
					"	group by kode_lokasi,kode_akun "+
					"	) d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi "+
					
					"	left join  "+
					"	( "+
					"	select kode_lokasi,kode_akun,sum(total) as apr from agg_usul_j "+
					"	where periode = '"+this.c_tahun.getText()+"04' "+
					"	group by kode_lokasi,kode_akun "+
					"	) e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi "+
					
					"	left join  "+
					"	( "+
					"	select kode_lokasi,kode_akun,sum(total) as mei from agg_usul_j "+
					"	where periode = '"+this.c_tahun.getText()+"05' "+
					"	group by kode_lokasi,kode_akun "+
					"	) f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi "+
					
					"	left join  "+
					"	( "+
					"	select kode_lokasi,kode_akun,sum(total) as jun from agg_usul_j "+
					"	where periode = '"+this.c_tahun.getText()+"06' "+
					"	group by kode_lokasi,kode_akun "+
					"	) g on a.kode_akun=g.kode_akun and a.kode_lokasi=g.kode_lokasi "+
					
					"	left join  "+
					"	( "+
					"	select kode_lokasi,kode_akun,sum(total) as jul from agg_usul_j "+
					"	where periode = '"+this.c_tahun.getText()+"07' "+
					"	group by kode_lokasi,kode_akun "+
					"	) h on a.kode_akun=h.kode_akun and a.kode_lokasi=h.kode_lokasi "+
					
					"	left join  "+
					"	( "+
					"	select kode_lokasi,kode_akun,sum(total) as agu from agg_usul_j "+
					"	where periode = '"+this.c_tahun.getText()+"08' "+
					"	group by kode_lokasi,kode_akun "+
					"	) i on a.kode_akun=i.kode_akun and a.kode_lokasi=i.kode_lokasi "+
					
					"	left join  "+
					"	( "+
					"	select kode_lokasi,kode_akun,sum(total) as sep from agg_usul_j "+
					"	where periode = '"+this.c_tahun.getText()+"09' "+
					"	group by kode_lokasi,kode_akun "+
					"	) j on a.kode_akun=j.kode_akun and a.kode_lokasi=j.kode_lokasi "+
					
					"	left join  "+
					"	( "+
					"	select kode_lokasi,kode_akun,sum(total) as okt from agg_usul_j "+
					"	where periode = '"+this.c_tahun.getText()+"10' "+
					"	group by kode_lokasi,kode_akun "+
					"	) k on a.kode_akun=k.kode_akun and a.kode_lokasi=k.kode_lokasi "+
					
					"	left join  "+
					"	( "+
					"	select kode_lokasi,kode_akun,sum(total) as nov from agg_usul_j "+
					"	where periode = '"+this.c_tahun.getText()+"11' "+
					"	group by kode_lokasi,kode_akun "+
					"	) l on a.kode_akun=l.kode_akun and a.kode_lokasi=l.kode_lokasi "+
					
					"	left join  "+
					"	( "+
					"	select kode_lokasi,kode_akun,sum(total) as des from agg_usul_j "+
					"	where periode = '"+this.c_tahun.getText()+"12' "+
					"	group by kode_lokasi,kode_akun "+
					"	) m on a.kode_akun=m.kode_akun and a.kode_lokasi=m.kode_lokasi "+
					
					"where a.kode_lokasi='"+this.app._lokasi+"' and "+
					"(round(isnull(b.jan,0)+isnull(c.feb,0)+isnull(d.mar,0)+isnull(e.apr,0)+isnull(f.mei,0)+isnull(g.jun,0)+isnull(h.jul,0)+isnull(i.agu,0)+isnull(j.sep,0)+isnull(k.okt,0)+isnull(l.nov,0)+isnull(m.des,0),0)) > 0"+
					"order by a.kode_akun";
				
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.dc.toUpperCase(),line.nama,floatToNilai(line.jan),floatToNilai(line.feb),floatToNilai(line.mar),floatToNilai(line.apr),floatToNilai(line.mei),floatToNilai(line.jun),floatToNilai(line.jul),floatToNilai(line.agu),floatToNilai(line.sep),floatToNilai(line.okt),floatToNilai(line.nov),floatToNilai(line.des),floatToNilai(line.total),'-']);
				}
			} else this.sg.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_post_m','no_post',this.app._lokasi+"-POAG"+this.c_tahun.getText()+".",'000'));			
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();						
						}else system.info(this,result,"");
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
			this.sg.clear(1); this.sg1.clear(1);  
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});